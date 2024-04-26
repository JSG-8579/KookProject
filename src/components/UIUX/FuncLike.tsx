//좋아요버튼 기능
import React, { useEffect, useState } from 'react';
import "@/components/style/like.scss";
import { useStore } from '../recipe_store/all_store';
import { useSession } from 'next-auth/react';
import { useStore5 } from '../recipe_store/like_store';

function FuncLike({ obj }: any) {

    // let num = Math.floor(obj.like)

    const { data5, dataCrl5 } = useStore5()

    const { data: session, status }: any = useSession();

    let [isLike, setIsLike] = useState(false);
    // const [pluslike, setPluslike] = useState(num);
    const { dataCrl, data } = useStore()

    const changeLike = (bb:any) => {

        if(status === 'unauthenticated'){
            alert('로그인이 필요한 서비스입니다.')
            return
        }

        let Dateid = Date.now()
        let likeOne = obj;
        let bbbbb = data5.filter((obj2:any)=>obj.seq == obj2.seq && obj2.user_id == session.user.id)
        
        
        if (!isLike) {
            const likeData = {
                "id": `${Dateid}`,
                "seq": `${likeOne.seq}`,
                "name": `${likeOne.name}`,
                "user_name": `${session.user.name}`,
                "user_email": `${session.user.email}`,
                "user_id": `${session.user.id}`,
                "m_thumb": `${likeOne.m_thumb}`,
                "tip": `${likeOne.tip}`,
                // "like": likeOne.like+1
            }

 
            // let putupLike = {
            //     "like": Number(likeOne.like) +1
            // }

            dataCrl5("insert",'', likeData)
            // dataCrl5("put",likeOne.seq, putupLike)
            // dataCrl("put",likeOne.seq, putupLike)
        } else {
            // const ddd = {
            //     'user_id': session.user.id,
            //     'seq': bb.seq
            // }

            // let putdownLike = {
            //     "like": Number(likeOne.like) - 1
            // }
            dataCrl5("delete", bbbbb[0].id, '')
            // dataCrl5("put", likeOne.seq, putdownLike)
            // dataCrl("put", likeOne.seq, putdownLike)
            
        }

        setIsLike(!isLike);
    }

    useEffect(() => {
        // let like: any = Math.floor(obj.like);
        const checkBook = data5.filter(like=>(like.seq == obj.seq) && (like.user_id == session?.user.id))
        // if(session.user.email){
        // let aaaa = (checkBook[0].user_email == session.user.email)
        
        if(checkBook.length && session){
            setIsLike(true)
        }else{
            setIsLike(false)
        }
        // setPluslike(like);
    }, [obj])

    // useEffect(() => {
    //     isLike ? setPluslike(pluslike + 1) : setPluslike(pluslike - 1);
    // }, [isLike])


    return (
        <span className="like">
            <button onClick={()=>{changeLike(obj)}}>
                <img src={isLike ? "/images/heart_red.png" : "/images/heart_black.png"} alt="heart" />
                {/* {pluslike >= 99 ? '+' + 99 : pluslike} */}
            </button>
        </span>
    );
}

export default FuncLike;