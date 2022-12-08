//components
import ListEntity from './ListEntity/ListEntity';

function List({ list }) {

    //JSX
    return (
        <ul id="list">
            {list.map(listEntity => (
                <ListEntity
                    key={listEntity.id}
                    listEntity={listEntity}

                />
            ))}
        </ul>
    );
}

export default List;