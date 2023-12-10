import '../css/Carousel.css';
import ChevronLeftSVG from '../assets/chevron_left.svg?react';
import ChevronRightSVG from '../assets/chevron_right.svg?react';
import { useRef, useEffect } from 'react';

export default function Carousel({ pokemon }) {
    const imageSkeleton = useRef();
    const image = useRef();

    useEffect(() => {
        image.current.onload = e => {
            image.current.style.display = 'block';
            imageSkeleton.current.style.display = 'none';
        };
    }, []);

    return (
        <div className="carousel">
            <button type="button">
                <ChevronLeftSVG height="24" width="24" />
            </button>
            <img src={'/img/pokemon_skeleton.png'} ref={imageSkeleton} className="pokemonSprite" height="200" width="200" alt="Pokémon front" />
            <img src={pokemon ? pokemon.imageSrc : null} ref={image} className="pokemonSprite" height="200" width="200" alt="Pokémon front" style={{ display: 'none' }} />
            <button type="button">
                <ChevronRightSVG height="24" width="24" />
            </button>
        </div>
    );
}