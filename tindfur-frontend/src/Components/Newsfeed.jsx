import './Newsfeed.css';
import NewsCard from './NewsCard';

const image1 = "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const image2 = "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
const image3 = "https://images.pexels.com/photos/2071882/pexels-photo-2071882.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"

export default function Newsfeed() {
    return (
        <div className='Newsfeed'>
            <NewsCard pet="Joey" image={image1} news="New Profile"/>
            <NewsCard pet="Frank" image={image2} news="New Adoption"/>
            <NewsCard pet="Luna" image={image3} news="New Profile"/>
        </div >
    )
}


{/* <section className='Newsfeed'>
<div>
<h5>New Profile</h5>
<h6>Joey</h6>
<img src="https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Girl in a jacket" width="200" height="200"></img>
</div>
<div>
<h5>New Adoption</h5>
<h6>Frank</h6>
<img src="https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Girl in a jacket" width="200" height="200"></img>
</div>
</section> */}