import Card from '../components/Card';
import React from 'react';
import AppContext from '../context';

function Favorites() {
    const { favItems, onFavorite } = React.useContext(AppContext)

    return (
        <div className="content p-40">
            <div className="d-flex justify-between align-center mb-40">
                <h1>Мои закладки</h1>
            </div>
            <div className="d-flex flex-wrap">
                {favItems.map((item, index) => (
                    <Card
                        key={index}
                        favorited={true}
                        onFavorite={onFavorite}
                        {...item}
                    />
                ))
                }
            </div>
        </div>
    );
}

export default Favorites;