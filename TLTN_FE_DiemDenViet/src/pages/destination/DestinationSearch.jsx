import { useEffect, useState } from "react";
import { Button, Dropdown } from "flowbite-react";
import DestinationCard from "../../components/destination/DestinationCard";
import SelectCategory from "../../components/destination/search-destination/SelectCategory";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import DestinationService from "../../services/DestinationService";
import SelectAddress3 from "../../components/address/SelectAddress3";

export default function DestinationSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 12;
  const [openModalCategory, setOpenModalCategory] = useState(false);

  const handleSearch = async () => {
    const queryParams = new URLSearchParams({
      ...(filter.searchTerm && { searchTerm: filter.searchTerm }),
      ...(filter.provinceId && { provinceId: filter.provinceId }),
      ...(filter.districtId && { districtId: filter.districtId }),
      ...(filter.wardId && { wardId: filter.wardId }),
      ...(filter?.category?.categoryId && {
        categoryId: filter.category.categoryId,
      }),
      ...(filter?.category?.subcategoryId && {
        subcategoryId: filter.category.subcategoryId,
      }),
      ...(filter.sortBy && { sortBy: filter.sortBy }),
      page: currentPage,
      limit: itemsPerPage,
    }).toString();
    try {
      const res = await DestinationService.search(queryParams);
      if (res.status) {
        setDestinations(res.data.data);
        setTotalPages(Math.ceil(res.data.total / itemsPerPage));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [filter, currentPage]);

  return (
    <div className="bg-gray-100 w-full py-1">
      <div className="max-w-6xl bg-white mx-auto min-h-screen gap-3 p-3">
        <div>
          {/* search and filter */}
          <div>
            <div className="max-w-2xl mx-auto">
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              ></label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tìm kiếm điểm đến"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <button
                  onClick={() =>
                    setFilter({ ...filter, searchTerm: searchTerm })
                  }
                  className="text-white absolute end-2.5 bottom-2.5 bg-gray-400 hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Tìm kiếm
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-3">
              <SelectAddress3 formData={filter} setFormData={setFilter} />
              <SelectCategory
                openModal={openModalCategory}
                setOpenModal={setOpenModalCategory}
                formData={filter}
                setFormData={setFilter}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <Dropdown label="Sắp xếp theo:" inline className="mr-0">
              <Dropdown.Item
                onClick={() => setFilter({ ...filter, sortBy: "rating" })}
              >
                nhận xét
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => setFilter({ ...filter, sortBy: "views" })}
              >
                Lượt xem
              </Dropdown.Item>
            </Dropdown>
            <Button size="xs" href="/destination">
              Làm mới bộ lọc
            </Button>
          </div>
        </div>
        {/* results */}
        <div className="mt-5">
          {destinations.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 justify-items-center">
                {destinations.map((destination, index) => (
                  <DestinationCard destination={destination} key={index} />
                ))}
              </div>
              <div className="flex justify-center py-6 mt-2">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event, value) => {
                    setCurrentPage(value);
                  }}
                  color="primary"
                />
              </div>
            </div>
          ) : (
            <div>
              <h2>Không có tìm thấy điểm đến nào.</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
