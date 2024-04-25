import { useSelector } from "react-redux"
import RenderCartCourses from './RenderCartCourses';
import RenderTotalAmount from './RenderTotalAmount';


export default function Cart() {

    const {total, totalitems} = useSelector((state) => state.auth);


    return (
        <div>
            <h1>Your Cart</h1>
            <p>{totalitems} Courses in Cart</p>

            {total > 0
            ? (<div>
                <RenderCartCourses/>
                <RenderTotalAmount/>
            </div>)
            : (<p>Your Cart is Empty</p>)}
        </div>
    )
}