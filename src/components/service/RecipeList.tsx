"use client";
import { useStore } from '../recipe_store/all_store';
import RecipeWid from '../UIUX/RecipeWid';
import RecipeSq from '../UIUX/RecipeSq';
import Home_detail from '../UIUX/Home_detail';
import { useStore2 } from '../recipe_store/bookmark_store';
import { useStore4 } from '../recipe_store/comment_store';
import { useSession } from 'next-auth/react';
import { useStore5 } from '../recipe_store/like_store';
import recipe from "@/lib/recipe.json";


function RecipeList({idx,detailUrl,selectName,sortCate,setFameImg}:any) {

    
    let { data, dataCrl } = useStore();
    let { data2, dataCrl2 } = useStore2();
    let { data4, dataCrl4 } = useStore4();
    let { data5, dataCrl5 } = useStore5();
    const { data: session, status }: any = useSession();
    let allData = recipe.filter((obj:any)=>obj.m_cate==sortCate);
    let likeData = recipe.sort((a:any, b:any) => a.like - b.like);
    let recipeSort = allData.slice(0,20);


    let comp;
    switch (idx) {
        case "가로":
            comp=<RecipeWid selectName={selectName} dataID={recipeSort} dataCrl={dataCrl} data4={data4}/>
            break;
        case "정사각형":
            comp=<RecipeSq dataID={likeData} dataCrl={dataCrl} />
            break;
            
        case "홈세부":
            comp=<Home_detail dataID={recipe} data4={data4} detailUrl={detailUrl} dataCrl4={dataCrl4} session={session}/>
            break;
        default:
            break;
    }


    return (
        <>
            {comp}
        </>
    );
}

export default RecipeList;