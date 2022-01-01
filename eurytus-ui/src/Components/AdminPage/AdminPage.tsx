import { NavLink, Route, Routes } from "react-router-dom";

const AdminPage = ({ children }:{children: React.ReactNode}) => {
    return(
        <div id="solvechallenge">
            <div className="w-full flex h-full">
                <div className="w-1/6 bg-white flex h-full shadow flex-col p-6">
                    <h1 className="my-6 text-secondary font-light text-3xl">Eurytus Admin</h1>
                    <NavLink to="/admin" 
                        className={({ isActive }) =>
                            `${isActive ? 'text-white bg-secondary' : 'text-gray-900 hover:bg-gray-200'} rounded-lg p-3 text-sm mt-2 font-semibold`
                        }>
                        Dashboard
                    </NavLink>
                    <NavLink to="/admin/requests" className={({ isActive }) =>
                        `${isActive ? 'text-white bg-secondary' : 'text-gray-900 hover:bg-gray-200'} rounded-lg p-3 text-sm mt-2 font-semibold`
                    }>
                        Requests
                    </NavLink>
                    <NavLink to="/admin/challenges" className={({ isActive }) =>
                        `${isActive ? 'text-white bg-secondary' : 'text-gray-900 hover:bg-gray-200'} rounded-lg p-3 text-sm mt-2 font-semibold`
                    }>
                        Challenges
                    </NavLink>
                </div>
                <div className="w-5/6 p-14">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminPage;