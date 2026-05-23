import Navbar from "../../components/Navbar";
import TableHeader from "../../components/TableHeader";

const Home = () => {
  return (
 <>
 
    <div className="w-full" >
      <Navbar />
    </div>

      <div className="lg:px-9 md:px-6 px-3 mt-6 md:mt-8">
        <div className="max-w-475 mx-auto">
          <TableHeader />
          {/* <Table /> */}
        </div>
      </div>
 </>
  );
};

export default Home;
