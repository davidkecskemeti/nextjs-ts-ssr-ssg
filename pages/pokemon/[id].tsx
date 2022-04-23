/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/Details.module.css";

interface PokemonProps {}

const Pokemon: React.FC<PokemonProps> = () => {
  const {
    query: { id },
  } = useRouter();

  const BASE_URL = "http://localhost:3000";
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
