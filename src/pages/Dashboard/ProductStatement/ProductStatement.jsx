import { MdOutlineDeleteOutline } from 'react-icons/md';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useSellProduct from '../../../hooks/useSellProduct';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import Pagination from '../../../components/pagination/pagination';
import useSoldItems from '../../../hooks/useSoldItems';
import DashBoardTitle from '../../../components/dashboardTitle/DashBoardTitle';

const ProductStatement = () => {
    // const [sellProducts, refetch, currentPage, totalPages, setCurrentPage] = useSellProduct();
    const [soldItems, refetch, currentPage, totalPages, setCurrentPage] = useSoldItems();
    const axiosPublic = useAxiosPublic();
    console.log(soldItems)

    const handleDelete = (product) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete(`/sellProduct/${product?._id}`)
                    .then(res => {
                        console.log(res)
                        refetch();
                        if (res.status === 200) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Product Statement has been deleted..!",
                                icon: "success"
                            });
                        }
                    })
            }
        });


    }
    return (
        <div className='overflow-scroll 2xl:h-[80vh] lg:h-[84.5vh] lg:ml-3 xl:ml-9 mx-3 lg:mx-0'>
            <div className="mb-2">
                <DashBoardTitle
                    title={"Admin"}
                    subTitle={"Add, Edit your category section in one click. "}
                />
            </div>
            <div className='px-2 bg-white pt-2 rounded-md'>
                <div className='px-3 lg:w-6/12 mx-auto text-center mb-7'>
                    <SectionTitle
                        title="Statement Pieces"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='border-b-[1.5px] border-black text-black'>
                                <th className='p-auto md:p-0'>#</th>
                                <th>Code</th>
                                <th>Selling Date</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                soldItems?.items?.map((product, ind) => <tr className='border-b-[1.2px] border-black' key={product?._id}>
                                    <td className='p-auto md:p-0'>{ind + 1}</td>
                                    <td>{product?.productCode}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="">{new Date(product?.sellingDate).toLocaleDateString()}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {product?.quantity}
                                    </td>
                                    <td>
                                        {product?.price}
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(product)} className="btn btn-sm">
                                            <MdOutlineDeleteOutline />
                                        </button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
                {/* pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ProductStatement;