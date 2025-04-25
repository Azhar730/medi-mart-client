import Banner from "@/components/modules/home/Banner";
import FeaturedMedicines from "@/components/modules/home/FeaturedMedicines";
import ReviewSection from "@/components/modules/home/ReviewSection";

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <FeaturedMedicines/>
            <ReviewSection/>
        </div>
    );
};

export default HomePage;