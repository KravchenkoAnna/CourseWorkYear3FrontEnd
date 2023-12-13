function Table(props) {

    return (
        <div className="container bg-dark">
            <table className="table table-hover table-dark">
                {props.children}
            </table>
        </div>
    );
}

export default Table;