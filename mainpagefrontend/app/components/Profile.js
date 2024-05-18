import { useState, useEffect } from "react"
import Posts from "./Posts"
import '../styles/interests.css'
import { useRouter } from 'next/navigation';
export default function Profile({ data }) {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [interests, setInterests] = useState(data.interests);
    useEffect(() => {
        const filteredPosts = data.posts.filter(post =>
            post.tags.some(tag => tag.includes(data.interest))
        );
        setPosts(filteredPosts);
    }, [data.interest]);

    const handler = (e) => {
        data.setInterest(e.target.innerHTML);
        if(e.target.innerHTML != data.interest){
            setPosts([]);
        }
        console.log(posts)
    }
    const logout=()=>{
        localStorage.removeItem('user');
        router.push("/login");
    }
    
    return (
        <div className="interestInfo">
            <div className="header">
              <div style={{border:"2px solid white",width:"100%",height:"50vh",position:"absolute",marginTop:"500px",display:"flex",flexDirection:"row",gap:"4px",borderRadius:"30px",overflow:"hidden"}}>
                <div style={{width:"40%"}}>
                    <div style={{border:"2px solid white",height:"200px",width:"200px",borderRadius:"50%",margin:"30px",objectFit:"cover",overflow:"hidden",marginTop:"20%",boxShadow:"2px 2px 20px white"}}>
                        <img src="https://th.bing.com/th/id/OIP.OepUxR0WCQS6TCbMR0BjMgHaNK?rs=1&pid=ImgDetMain"/>
                    </div>
                </div>
                <div style={{width:"50%",marginTop:"5%"}}>
                    <div style={{display:"flex",height:"100%",width:"100%",flexDirection:"column",marginTop:"60px",fontWeight:"lighter"}}>
                <div>
                    <p>Username: <span style={{fontFamily:"sans-serif",fontWeight:"lighter"}}>Neelesh</span></p>
                </div>
                <div>
                    <p>Nick name: <span style={{fontFamily:"sans-serif",fontWeight:"lighter"}}>@rocky</span></p>
                </div>

                <div>
                    <p>Bio: <span style={{fontFamily:"sans-serif",fontWeight:"lighter"}}>Front End Developer</span></p>
                </div>

                <div>
                <button class="bg-red-500 hover:bg-blue-700 text-white font-light py-1 px-2 border border-blue-700 rounded" style={{marginTop:"20px"}} onClick={logout}>
                  Logout
                </button>
                </div>
            
                </div>

                </div>

              </div>
            </div>
            {posts[0] &&
                <Posts data={{posts}} />
            }
        </div>
    )
}