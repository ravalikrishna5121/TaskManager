const Tasks=()=>{
    return(
        <div className="block column">
            <div className="check" style={{padding:'0px',border:'none'}}>
            <h3>Tasks Due Soon</h3>
            <a href="task">see all my tasks</a>
            </div>
                <div className="check">
                    <div>
                        <input type="checkbox" name="check" />
                        <label htmlFor="check">Meeting with Google</label>
                    </div>
                    <p>DEC 35,2023</p>
                </div>
                <div className="check">
                    <div>
                        <input type="checkbox" name="check" />
                        <label htmlFor="check">Meeting with Google</label>
                    </div>
                    <p>DEC 35,2023</p>
                </div>
                <div className="check">
                    <div>
                        <input type="checkbox" name="check" />
                        <label htmlFor="check">Meeting with Google</label>
                    </div>
                    <p>DEC 35,2023</p>
                </div>
                </div>
    )
}
export default Tasks;