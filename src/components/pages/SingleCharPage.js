import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

import './singleComicPage.scss';

const SingleCharPage = () => {
    const { id } = useParams();
    const [char, setChar] = useState(null);
    const { loading, error, getCharacter, clearError } = useMarvelService();

    console.log(id);

    useEffect(() => {
        updateChar();
    }, [id]);

    const updateChar = () => {
        clearError();
        getCharacter(id).then(onCharLoaded);
    };

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !char) ? <View char={char} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

const View = ({ char }) => {
    const { name, description, thumbnail } = char;

    console.log();

    return (
        <div className="single-comic">
            <Helmet>
                <title>{name}</title>
                <meta name="description" content={`${name} marvel character`} />
            </Helmet>
            <img src={thumbnail} alt={name} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </div>
    );
};

export default SingleCharPage;
