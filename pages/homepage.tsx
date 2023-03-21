export default function Home() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-white grid grid-cols-[80px_1fr]">
      <ul className="menu bg-base-100 border-r border-gray-400 px-2 py-2">
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </a>
        </li>
        <li>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </a>
        </li>
        <li>
          <a>
            <picture>
              <img
                src="https://s2.svgbox.net/hero-outline.svg?ic=cog&color=000"
                width="32"
                height="32"
                alt="settings"
              />
            </picture>
          </a>
        </li>
        <li className="flex mt-auto">
          <a>
            <picture>
              <img
                src="https://s2.svgbox.net/materialui.svg?ic=logout&color=000"
                width="32"
                height="32"
                alt="logout"
              />
            </picture>
          </a>
        </li>
      </ul>

      <div className="bg-base-200 py-10 px-10 ">
        <div className="flex mb-10 border w-full h-auto">
          <h2 className="font-bold text-xl w-fit h-fit">User’s Projects</h2>
        </div>

        <div className="relative flex justify-center items-center ">
          <span className="absolute left-2 bottom-7">🔍</span>
          <input
            type="text"
            placeholder="  Search filter"
            className="input input-bordered w-full  rounded-full bg-gray-300 mb-4 focus:outline-none placeholder:pl-[14px] px-6"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th> 🔑 id</th>
                <th>🪪 name</th>
                <th>url</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>
                  <a href="https:www.google.gr" className="hover:underline">
                    www.google.gr
                  </a>
                </td>
              </tr>
              {/* row 2 */}
              <tr className="hover">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>
                  <a href="https:www.google.gr" className="hover:underline">
                    www.google.gr
                  </a>
                </td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>
                  <a href="https:www.google.gr" className="hover:underline">
                    www.google.gr
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
