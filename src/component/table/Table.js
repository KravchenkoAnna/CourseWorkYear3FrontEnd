function Table(props) {

    return (
        <div className="container bg-success-subtle">
            <table className="table table-hover table-success">
                {props.children}
            </table>
        </div>
    );
}

export default Table;