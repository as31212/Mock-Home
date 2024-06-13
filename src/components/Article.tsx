import { FaArrowRight } from "react-icons/fa";

interface ArticleInterface{
    title: string;
    img: string;
}
const Article:React.FC<ArticleInterface> = ({title,img})=>{

    return(
        <>
        <div className=" flex flex-col gap-5 w-1/5 min-w-96 h-[500px]">
        <img className="rounded-xl object-cover h-2/3 object-center" src={img} alt={`image of ${title}`} />
        <p className=" font-semibold text-xl">{title}</p>
        <p className=" text-orange-400 hover:underline">Read the Article <FaArrowRight className="inline relative bottom-[1px]" /></p>
        </div>
        </>
    );
}

export default Article;