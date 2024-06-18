import Article from "./Article";

const Blog: React.FC = () => {
  return (
    <>
      <div className="min-h-screen p-10 flex flex-col bg-[#FFFAF7]" id="Blog">
        <h2 className="font-bold text-2xl mb-8 text-center text-gray-800">Real Estate News & Blogs</h2>
        <div className="flex flex-col items-center" id="not-title-blog">
          <div className="flex gap-4 mb-8 flex-wrap w-full justify-center" id="search-blogs">
            <input
              className="w-1/3 min-w-[300px] py-2 border-2 rounded-lg text-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Title"
              type="text"
              name=""
              id=""
            />
            <select
              className="text-lg w-1/4 min-w-[300px] py-2 rounded-lg text-gray-500 font-bold border-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              name=""
              id=""
            >
              <option value="">Category</option>
            </select>
            <select
              className="text-lg w-1/4 min-w-[300px] py-2 rounded-lg border-2 text-gray-500 font-bold  focus:outline-none focus:ring-2 focus:ring-orange-400"
              name=""
              id=""
            >
              <option value="">Popular</option>
            </select>
          </div>
          <div className="flex flex-wrap justify-center gap-8" id="blog-articles">
            <Article
              title="9 Easy-to-Ambitious DIY Projects to Improve Your Home"
              img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTw-lCMSCTF5DK0ImCKQgamQC3Os5JeUriCYw&s"
            />
            <Article
              title="What You Can Do to Turn a Rental Into a Home"
              img="https://static.wixstatic.com/media/bf8702_b09748a16a2540c595aa74c2ead3c4f1~mv2.jpg/v1/fill/w_801,h_553,al_c,q_85,enc_auto/bf8702_b09748a16a2540c595aa74c2ead3c4f1~mv2.jpg"
            />
            <Article
              title="Home Hunting 101: Skills You Need to Find the Home For You"
              img="https://www.essentialhome.eu/inspirations/wp-content/uploads/2021/11/INSPIRATIONS-10-Beautiful-Living-Rooms-By-Top-Interior-Designers.png"
            />
            <Article
              title="How to Create a Cozy Reading Nook in Your Home"
              img="https://brabbu.com/blog/wp-content/uploads/2021/03/Meet-20-of-the-Most-Inspiring-Nice-Interior-Designers-Luxoria-1.jpg"
            />
            <Article
              title="Top 5 Plants to Purify the Air in Your Living Space"
              img="https://www.decorilla.com/online-decorating/wp-content/uploads/2019/06/modern-interior-design-grey-living-room2-scaled.jpeg"
            />
            <Article
              title="DIY Outdoor Furniture Projects for a Stylish Backyard"
              img="https://artstarts.net/wp-content/uploads/2020/12/1_result-1920x960-1-edited.jpg"
            />
            <Article
              title="Simple and Affordable Home Office Makeover Ideas"
              img="https://hoangthaodecor.com/vnt_upload/news/06_2018/img2.jpg"
            />
            <Article
              title="Creative Ways to Organize Your Kitchen and Pantry"
              img="https://www.vismayamvfx.com/wp-content/uploads/2018/05/beautiful-interior-design-beautiful-house-interior-amazing-perfect-beautiful-house-interior-design-within-house-beautiful-interior-designs-for-small-bedrooms.jpg"
            />
            <Article
              title="DIY Wall Art Projects to Add Personality to Your Space"
              img="https://media.designcafe.com/wp-content/uploads/2023/05/01213239/beautiful-modern-house-interior-design-tips.jpg"
            />
            <Article
              title="Budget-Friendly Bathroom Upgrades You Can Do Yourself"
              img="https://st.hzcdn.com/simgs/pictures/living-rooms/by-j-design-group-modern-interior-design-in-miami-miami-beach-contemporary-j-design-group-interior-designers-miami-modern-img~1061da3f02934c78_14-0485-1-867afee.jpg"
            />
            <Article
              title="Transform Your Basement into a Functional Living Area"
              img="https://media.licdn.com/dms/image/D4D12AQEw05YPKmleOw/article-cover_image-shrink_720_1280/0/1673599204911?e=2147483647&v=beta&t=S8Y5eOaqmUeqpvuJZkc6LOIJHH5znPLOGmrPEmeF_6w"
            />
            <Article
              title="Tips for Building a DIY Fire Pit in Your Backyard"
              img="https://st.hzcdn.com/simgs/pictures/living-rooms/by-j-design-group-panels-wall-paneling-miami-interior-designers-modern-j-design-group-interior-designers-miami-modern-img~6f21e3ef06e41ae1_14-9833-1-283b621.jpg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
