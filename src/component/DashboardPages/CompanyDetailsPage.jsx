
const CompanyDetailsPage = () => {
    return (
        <div className="bg-white p-10 border-t border-gray-300 h-full">
            <h1 className="text-4xl font-[500]">Company Details</h1>

            <div>
                <div className="flex items-center space-x-10">
                    <div className="mt-5">
                        <h1 className="text-[18px] font-[400]">Company Name</h1>
                        <input type="text" placeholder="Enter company name" name="" id="" className="border-[2px] border-gray-500 rounded-md py-[9px] w-[50vh] mt-2 pl-2" />
                    </div>
                    <div className="mt-4">
                        <h1 className="text-[18px] font-[400]">Company email</h1>
                        <input type="text" name="" placeholder="Enter company email" id="" className="border-[2px] border-gray-500 rounded-md py-[9px] w-[50vh] mt-2 pl-2" />
                    </div>

                </div>
                <div className="flex items-center space-x-10">
                    <div className="mt-5">
                        <h1 className="text-[18px] font-[400]">Company Website</h1>
                        <input type="text" name="" id="" placeholder="Enter company website" className="border-[2px] border-gray-500 rounded-md py-[9px] w-[50vh] mt-2 pl-2" />
                    </div>
                    <div className="mt-4">
                        <h1 className="text-[18px] font-[400]">Company Phone</h1>
                        <input type="text" name="" id="" placeholder="Enter company phone" className="border-[2px] border-gray-500 rounded-md py-[9px] w-[50vh] mt-2 pl-2" />
                    </div>

                </div>

                <div className="mt-5">
                    <h1 className="text-[18px] font-[400]">Company Type</h1>
                    <input type="text" name="" id="" placeholder="Enter company phone" className="border-[2px] border-gray-500 rounded-md py-[9px] w-[50vh] mt-2 pl-2" />
                </div>

                <div className="mt-5">
                    <h1 className="text-[18px] font-[400]">Description</h1>
                    <textarea
                        name="description"
                        id="description"
                        className="border-[2px] w-[50vh] border-gray-500 rounded-md py-[9px]mt-2 pl-2 resize mt-2"
                        rows="4"
                        placeholder="Enter company description..."
                    />
                </div>

                <button className="bg-[#000524] px-10 py-3 rounded-md font-[500] text-xl mt-5 text-white">Submit Information</button>

            </div>
        </div>
    );
}

export default CompanyDetailsPage;
