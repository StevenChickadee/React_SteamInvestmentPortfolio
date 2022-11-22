//components
import ListEntity from './ListEntity';

function List({ list, editListEntity, deleteListEntity, sellListEntity }) {

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