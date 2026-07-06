import React from 'react';
import {
    waitFor,
    render,
    screen,
    waitingForElementsToBeRemoved
} from '@testing-library/react';
import App from '../App';
import { server, rest } from "../test/mock-server";
import userEvent from '@testing-library/user-event';
import pokemonsResultPage1 from "./pokemon-result-limit-5-offset-0.json";
import pokemonsResultPage2 from "./pokemon-result-limit-5-offset-5.json";
import pokemonsResultPage3 from "./pokemon-result-limit-5-offset-10.json";

describe("Pokemon List with 'Load More' button", () => {
    let getPokemonsMock = jest.fn();
    beforeEach(() => {
        server.use(
            rest.get("https://pokeapi.co/api/v2/pokemon", async (req, res, ctx) => {
                console.log(`Pokemon API was called with ${req.url.searchParams.toString()}`);
                const offset = parseInt(req.url.searchParams.get("offset"));
                const limit = parseInt(req.url.searchParams.get("limit"));

                getPokemonsMock({ offset, limit });

                if(offset === 0) return res(ctx.json(pokemonsResultPage1));
                else if(offset === 5) return res(ctx.json(pokemonsResultPage2));
                else if(offset === 10) return res(ctx.json(pokemonsResultPage3));
                else return res.ctx.json({ count: 0, results: [] });
            })
        )
    });

    it("initially display the first 5 pokemons", async () => {
        render(<App />);

        expect(await screen.findByRole("list")).toBeInTheDocument();

        expect(await screen.findAllByRole("listitem")).toHaveLength(5);

        waitFor(() => {
            expect(screen.getAllByRole("listitem")
            .map((listItem) => listItem.textContent.trim()))
            .toMatchInlineSnapshot(`
              [
                "bulbasaur",
                "ivysaur",
                "venusaur",
                "charmander",
                "charmeleon",
              ]
            `);
        })
        

        expect(getPokemonsMock).toHaveBeenCalledWith({ offset: 0, limit: 5 });
    });

    it("shows a 'Load more' button and the info about number of items displayed", async () => {
        render(<App />);

        // Shows the 'Load more' button
        expect(await screen.findByRole("button")).toHaveTextContent("Load more");

        // Check that the summary correctly says how many items are shown
        expect(
        await screen.findByText(
            `Displaying 5 of ${pokemonsResultPage1.count} results`
        )
        ).toBeInTheDocument();
    });

    it("loads 5 more pokemons when the user presses 'Load more'", async () => {
        render(<App />);

        // Press the "Load more" button
        const user = userEvent.setup();

        await user.click(await screen.findByRole("button", { name: "Load more" }));

        // Check that the summary correctly updated
        expect(
        await screen.findByText(
            `Displaying 10 of ${pokemonsResultPage1.count} results`
        )
        ).toBeInTheDocument();

        // Check that 10 items are displayed
        expect(await screen.findAllByRole("listitem")).toHaveLength(10);

        // Check that those 10 items are what we expect
        expect(
        screen.getAllByRole("listitem").map((listItem) => listItem.textContent.trim())
        ).toMatchInlineSnapshot(`
          [
            "bulbasaur",
            "ivysaur",
            "venusaur",
            "charmander",
            "charmeleon",
            "charizard",
            "squirtle",
            "wartortle",
            "blastoise",
            "caterpie",
          ]
        `);
    });

    it("no longer shows the 'Load more' if the user reached the last page", async () => {
        render(<App />);

        // Press the "Load more" button twice, so we get to the last page
        const user = userEvent.setup();
        await user.click(await screen.findByRole("button", { name: "Load more" }));
        await user.click(await screen.findByRole("button", { name: "Load more" }));

        // Check that the summary correctly updated
        expect(
        await screen.findByText("Displaying 12 of 12 results")
        ).toBeInTheDocument();

        // Check that 12 items are displayed
        expect(screen.getAllByRole("listitem")).toHaveLength(12);

        // Check the 'Load more' button is no longer displayed
        expect(
        screen.queryByRole("button", { name: "Load more" })
        ).not.toBeInTheDocument();

        // Check that those 12 items are what we expect
        expect(
        screen.getAllByRole("listitem")
            .map((listItem) => listItem.textContent.trim()))
            .toMatchInlineSnapshot(`
              [
                "bulbasaur",
                "ivysaur",
                "venusaur",
                "charmander",
                "charmeleon",
                "charizard",
                "squirtle",
                "wartortle",
                "blastoise",
                "caterpie",
                "metapod",
                "butterfree",
              ]
            `);
    });

})