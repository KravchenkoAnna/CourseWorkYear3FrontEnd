function Table(props) {

    return (
        <div className="container">
            <table className="table table-hover table-success">
                {props.children}
            </table>
        </div>
    );
}

export default Table;