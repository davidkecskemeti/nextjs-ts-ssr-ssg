/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/Details.module.css";

const BASE_URL = "http://localhost:3000";

//Static side generation
export async function getStaticPaths() {
  const response = await fetch(`${BASE_URL}/pokemons.json`);
  const pokemons = await response.json();

  const paths = pokemons.map((p: any) => ({
    params: { id: p.id.toString() },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps() {
  const response = await fetch(`${BASE_URL}/pokemons.json`);
  return {
    props: { pokemons: await response.json() },
  };
}

// //Server side rendering
// export async function getServerSideProps() {
//   const response = await fetch(`${BASE_URL}/pokemon/${id}.json`);
//   return {
//     props: { pokemons: await response.json() },
//   };
// }

interface PokemonProps {}

const Pokemon: React.FC<PokemonProps> = () => {
  const {
    query: { id },
  } = useRouter();

  const [pokemon, setPokemon] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${BASE_URL}/pokemon/${id}.json`);
      setPokemon(await response.json());
    }
    if (id) fetchData();
  }, [id]);

  if (!pokemon) return null;

  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>

      <div>
        <Link href={"/"}>
          <a>Back to Home</a>
        </Link>
      </div>

      <div className={styles.layout}>
        <div>
          <img
            className={styles.picture}
            src={`${BASE_URL}/${pokemon.image}`}
            alt={pokemon.name}
          />
        </div>
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon?.type?.join(", ")}</div>
          <table>
            <thead className={styles.attribute}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon?.stats?.map(({ name, value }: any) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
