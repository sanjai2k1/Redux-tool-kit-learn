import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";


const reactionEmoji ={
    thumsup:'👍',
    like :'❤️'

}
const ReactionButtons =({post})=>{
const dispatch = useDispatch();
    return <div>
        {Object.entries(reactionEmoji).map(([name,emoji]) => <button type="button" class="btn btn-light" key={name} id={name} onClick={()=>{ 
            dispatch(reactionAdded
            ({
            postId : post.id,
            reaction :name
        }))}}>{emoji} {post.reactions[name]}</button>) }
    </div>

} 
export default ReactionButtons;