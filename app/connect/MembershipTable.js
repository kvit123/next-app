import React, { useState, useMemo } from 'react';
import Image from 'next/image';
export default function MembershipTable() {
    // Dummy data set
    const membersData = useMemo(() => [
        // Add 15 dummy records here
        { id: 1, name: 'สมชาย เข็มกลัด', carType: 'เซดาน', branch: 'สาขา ก', lastUsedBranch: 'สาขา ข', phone: '080-123-4567', contactDate: '2023-03-01 10:30', callReason: 'สอบถาม' },
        { id: 2, name: 'วรรณา สุขใจ', carType: 'เอสยูวี', branch: 'สาขา ค', lastUsedBranch: 'สาขา ก', phone: '080-234-5678', contactDate: '2023-03-02 11:15', callReason: 'บำรุงรักษา' },
        { id: 3, name: 'ประเสริฐ วงษ์สุวรรณ', carType: 'คูเป้', branch: 'สาขา ข', lastUsedBranch: 'สาขา ค', phone: '080-345-6789', contactDate: '2023-03-03 09:45', callReason: 'จองคิว' },
        { id: 4, name: 'สุนิสา จันทร์เพ็ญ', carType: 'รถเปิดประทุน', branch: 'สาขา ก', lastUsedBranch: 'สาขา ข', phone: '080-456-7890', contactDate: '2023-03-04 14:30', callReason: 'สอบถาม' },
        { id: 5, name: 'กิตติคุณ เกียรติศักดิ์', carType: 'เซดาน', branch: 'สาขา ค', lastUsedBranch: 'สาขา ก', phone: '080-567-8901', contactDate: '2023-03-05 16:00', callReason: 'ร้องเรียน' },
        { id: 6, name: 'อัญชลี ธนาชัย', carType: 'เอสยูวี', branch: 'สาขา ข', lastUsedBranch: 'สาขา ค', phone: '080-678-9012', contactDate: '2023-03-06 13:20', callReason: 'สอบถาม' },
        { id: 7, name: 'ธีระ วงศ์พัว', carType: 'แฮทช์แบ็ก', branch: 'สาขา ก', lastUsedBranch: 'สาขา ข', phone: '080-789-0123', contactDate: '2023-03-07 11:00', callReason: 'ข้อเสนอแนะ' },
        { id: 8, name: 'นภาพร สมบูรณ์', carType: 'รถกระบะ', branch: 'สาขา ค', lastUsedBranch: 'สาขา ก', phone: '080-890-1234', contactDate: '2023-03-08 10:10', callReason: 'สอบถาม' },
        { id: 9, name: 'จริยา มหาพฤกษ์', carType: 'เอสยูวี', branch: 'สาขา ข', lastUsedBranch: 'สาขา ค', phone: '080-012-3456', contactDate: '2023-03-15 12:45', callReason: 'สอบถาม' },
        { id: 10, name: 'John Doe', carType: 'Sedan', branch: 'Branch A', lastUsedBranch: 'Branch B', phone: '123-456-7890', contactDate: '2023-03-01', callReason: 'Inquiry' },
        { id: 11, name: 'Ivy Anderson', carType: 'Sedan', branch: 'Branch K', lastUsedBranch: 'Branch J', phone: '123-456-7890', contactDate: '2023-03-11', callReason: 'Inquiry' },
        { id: 12, name: 'Jane Smith', carType: 'SUV', branch: 'Branch C', lastUsedBranch: 'Branch A', phone: '234-567-8901', contactDate: '2023-03-02', callReason: 'Booking' },
        { id: 13, name: 'Alice Johnson', carType: 'Convertible', branch: 'Branch B', lastUsedBranch: 'Branch C', phone: '345-678-9012', contactDate: '2023-03-03', callReason: 'Service' },
        { id: 14, name: 'Bob Brown', carType: 'Coupe', branch: 'Branch D', lastUsedBranch: 'Branch A', phone: '456-789-0123', contactDate: '2023-03-04', callReason: 'Complaint' },
        { id: 15, name: 'Carol Williams', carType: 'Hatchback', branch: 'Branch E', lastUsedBranch: 'Branch D', phone: '567-890-1234', contactDate: '2023-03-05', callReason: 'Feedback' },
        { id: 16, name: 'David Wilson', carType: 'Sedan', branch: 'Branch F', lastUsedBranch: 'Branch E', phone: '678-901-2345', contactDate: '2023-03-06', callReason: 'Inquiry' },
        { id: 17, name: 'Eva Davis', carType: 'SUV', branch: 'Branch G', lastUsedBranch: 'Branch F', phone: '789-012-3456', contactDate: '2023-03-07', callReason: 'Booking' },
        { id: 18, name: 'Frank Miller', carType: 'Convertible', branch: 'Branch H', lastUsedBranch: 'Branch G', phone: '890-123-4567', contactDate: '2023-03-08', callReason: 'Service' },
        { id: 19, name: 'Grace Martinez', carType: 'Coupe', branch: 'Branch I', lastUsedBranch: 'Branch H', phone: '901-234-5678', contactDate: '2023-03-09', callReason: 'Complaint' },
        { id: 20, name: 'Henry Taylor', carType: 'Hatchback', branch: 'Branch J', lastUsedBranch: 'Branch I', phone: '012-345-6789', contactDate: '2023-03-10', callReason: 'Feedback' },
    ], [/* dependencies here */]);

    const [sortedField, setSortedField] = useState(null);
    const [sortDirection, setSortDirection] = useState('asc');

    // New state for search text
    const [searchText, setSearchText] = useState('');


    const sortedMembers = useMemo(() => {
        let sortableItems = [...membersData];
        if (sortedField !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortedField] < b[sortedField]) {
                    return sortDirection === 'asc' ? -1 : 1;
                }
                if (a[sortedField] > b[sortedField]) {
                    return sortDirection === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [membersData, sortedField, sortDirection]);

    // Adjusted useMemo for filtering and sorting
    const filteredAndSortedMembers = useMemo(() => {
        // First, filter data based on search text
        const filteredData = membersData.filter(member =>
            Object.values(member).some(
                value =>
                    value.toString().toLowerCase().includes(searchText.toLowerCase())
            )
        );

        // Then, sort the filtered data
        if (sortedField !== null) {
            filteredData.sort((a, b) => {
                if (a[sortedField] < b[sortedField]) {
                    return sortDirection === 'asc' ? -1 : 1;
                }
                if (a[sortedField] > b[sortedField]) {
                    return sortDirection === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filteredData;
    }, [membersData, sortedField, sortDirection, searchText]);


    const requestSort = (field) => {
        let direction = 'asc';
        if (sortedField === field && sortDirection === 'asc') {
            direction = 'desc';
        }
        setSortedField(field);
        setSortDirection(direction);
    };


     // New state for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(10);
     
     // Calculate the total number of pages
    const totalPages = Math.ceil(membersData.length / recordsPerPage);
 
    //  // Get the current records to display
    // const currentRecords = useMemo(() => {
    //     const startIndex = (currentPage - 1) * recordsPerPage;
    //     const endIndex = startIndex + recordsPerPage;
    //     return sortedMembers.slice(startIndex, endIndex);
    // }, [sortedMembers, currentPage, recordsPerPage]);
 
    // Adjusted logic for pagination
    const currentRecords = useMemo(() => {
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        return filteredAndSortedMembers.slice(startIndex, endIndex);
    }, [filteredAndSortedMembers, currentPage, recordsPerPage]);


     // Function to change page
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
 
     // Function to change records per page
    const changeRecordsPerPage = (event) => {
        setRecordsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to first page on changing records per page
    };

    // Assume a fixed number of columns in the table
    const numberOfColumns = 8; // Adjust this to match the actual number of columns in your table


    const toE164Format = (phoneNumber, defaultCountryCode = '+1') => {
        // Remove all non-numeric characters except plus sign
        let cleaned = ('' + phoneNumber).replace(/\D/g, '');
    
        // Check if the number already starts with the country code
        if (cleaned.startsWith('0')) {
            cleaned = '+66' + cleaned.substring(1);
            return cleaned;
        } else {
            // Add the default country code
            return `${defaultCountryCode}${cleaned}`;
        }
    };

    const handlePhoneClick = (event, phoneNumber) => {
        event.preventDefault(); // Prevent the default link behavior
    
        // Example: Call a function to connect with Amazon Connect
        // This is pseudocode and will depend on your specific Amazon Connect setup
        connectToAmazonConnect(phoneNumber);
    };

    const connectToAmazonConnect = (phoneNumber) => {
        // Use Amazon Connect Streams API or other methods to initiate the call
        // This is highly dependent on your AWS setup and configuration
        // Example: amazonConnect.startOutboundCall(phoneNumber, contactFlowId, instanceId);
        const endpoint = window.connect.Endpoint.byPhoneNumber(phoneNumber);

        window.connect.agent((agent) => {
            agent.connect(endpoint, {
                // Additional options here, if needed
                success: function() { console.log("Call initiated successfully"); },
                failure: function() { console.log("Call failed to initiate"); }
            });
        });
    };


    return (
        <div className="flex min-h-screen items-top justify-left">
            <div className="overflow-x-auto ">

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="input input-bordered"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <table className="table-sm text-sm min-w-full bg-white shadow-md rounded-xl">
                    <thead>
                        <tr className='bg-blue-gray-100 text-gray-700'>
                            <th className='py-3 px-4 text-left' onClick={() => requestSort('id')}>No</th>
                            <th className='py-3 px-4 text-left' onClick={() => requestSort('name')}>Customer Name</th>
                            <th className='py-3 px-4 text-left' onClick={() => requestSort('carType')}>Type of Car</th>
                            <th className='py-3 px-4 text-left' onClick={() => requestSort('branch')}>Branch</th>
                            <th className='py-3 px-4 text-left' onClick={() => requestSort('lastUsedBranch')}>Last Used Branch</th>
                            <th className='py-3 px-4 text-left' onClick={() => requestSort('phone')}>Phone Number</th>
                            <th className='py-3 px-4 text-left' onClick={() => requestSort('contactDate')}>Date and Time of Contact</th>
                            <th className='py-3 px-4 text-left' onClick={() => requestSort('callReason')}>Call Reason</th>
                            <th className='py-3 px-4 text-left' >Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {currentRecords.length > 0 ? (
                            currentRecords.map(member => (
                                <tr className='border-b border-blue-gray-200' key={member.id}>
                                    <td className='py-3 px-4'>{member.id}</td>
                                    <td className='py-3 px-4'>{member.name}</td>
                                    <td className='py-3 px-4'>{member.carType}</td>
                                    <td className='py-3 px-4'>{member.branch}</td>
                                    <td className='py-3 px-4'>{member.lastUsedBranch}</td>
                                    <td className='py-3 px-4'>
                                        <a href={`tel:${toE164Format(member.phone)}`} onClick={(e) => handlePhoneClick(e, toE164Format(member.phone))}>
                                            {member.phone}
                                        </a>
                                    </td>
                                    <td className='py-3 px-4'>{member.contactDate}</td>
                                    <td className='py-3 px-4'>{member.callReason}</td>
                                    <td className='py-3 px-4'>
                                        <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>โทร</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            // Render blank rows if no results found
                            <>
                                {/* Render a single row with "No data found" message */}
                                <tr className='border-b border-blue-gray-200'>
                                    <td className='py-3 px-4 text-left' colSpan={numberOfColumns}>No data found</td>
                                </tr>
                                {/* Fill the remaining rows with blank cells */}
                                {[...Array(recordsPerPage - 1)].map((_, index) => (
                                    <tr className='border-b border-blue-gray-200' key={index}>
                                        {Array.from({ length: numberOfColumns }, (_, k) => (
                                            <td className='py-3 px-4' key={k}></td>
                                        ))}
                                    </tr>
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
                
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>


                        <div className="flex justify-center items-center w-full  min-h-screen bg-white px-5 py-5">
                            <div className="xl:max-w-7xl bg-white drop-shadow-xl border border-black/20 w-full rounded-md flex justify-between items-stretch px-5 xl:px-5 py-5">
                                <div className="sm:w-[60%] lg:w-[50%] bg-cover bg-center items-center justify-center hidden md:flex ">
                                <Image
                                    src="usericon.png"
                                    alt="login"
                                    className="h-[500px]"
                                />
                                </div>
                                <div className="mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0">
                                <h1 className="text-center text-2xl sm:text-3xl font-semibold text-[#4A07DA]">
                                    Create Account
                                </h1>
                                <div className="w-full mt-5 sm:mt-8">
                                    <div className="mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <input
                                        type="text"
                                        placeholder="Enter Your First Name"
                                        className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
                                        />
                                        <input
                                        type="text"
                                        placeholder="Enter Your Last Name"
                                        className="input input-bordered input-primary w-full max-w-xs text-black placeholder:text-black/70"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter Your Email"
                                        className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Enter Your Phone No"
                                        className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                                    />
                                    <input
                                        type="Password"
                                        placeholder="Enter Your Password"
                                        className="input input-bordered input-primary w-full text-black placeholder:text-black/70"
                                    />
                                    <div className="flex items-center gap-1.5  justify-start pl-2">
                                        <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <input
                                            type="checkbox"
                                            className="checkbox-xs checkbox-primary"
                                            />
                                        </label>
                                        </div>
                                        <h3 className="flex items-center whitespace-nowrap text-xs text-black">
                                        I agree to the
                                        <span className="text-[#4A07DA]">&nbsp;Terms</span>
                                        &nbsp;and
                                        <span className="text-[#4A07DA]">&nbsp;Privacy Policy</span>.
                                        </h3>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center">
                                        <button className="btn btn-active btn-primary btn-block max-w-[200px]">
                                        Sign Up
                                        </button>
                                        <button className="btn btn-outline btn-primary btn-block max-w-[200px]">
                                        Sign In
                                        </button>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>


                        <p className="py-4">Press ESC key or click the button below to close</p>
                        <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                        </div>
                    </div>
                </dialog>

                            {/* Pagination controls */}
                <div className="flex justify-between items-center mt-4">
                    <div>
                        <select value={recordsPerPage} onChange={changeRecordsPerPage} className="select select-bordered">
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                        </select>
                    </div>
                    <div>
                        {[...Array(totalPages).keys()].map(number => (
                            <button
                                key={number}
                                onClick={() => goToPage(number + 1)}
                                className={`btn ${currentPage === number + 1 ? 'btn-active' : ''}`}
                            >
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}