import { accessLevel, withSessionSsr } from "@/lib/withSession";
import axios, { isCancel, AxiosError } from "axios";
import clsx from "clsx";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [projectUrl, setProjectUrl] = useState<string>("");
  const [projects, setProjects] = useState<any[]>([]);

  // brings the data from the server in every render and saves them in a state

  useEffect(() => {
    axios.get("/api/projects").then((e) => {
      setProjects(e.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content ">
          {/* <!-- Page content here --> */}
          <div className="w-screen h-screen overflow-hidden bg-white grid xs:grid-cols-[70px_1fr] md:grid-cols-[80px_1fr]">
            <ul className="menu bg-base-100 border-r border-gray-400 px-2 py-2">
              <li>
                <Link
                  href="/"
                  className={clsx({
                    "bg-primary": router.asPath === "/",
                  })}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="xs:h-6 xs:w-6 md:h-8 md:w-8"
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
                </Link>
              </li>
              <li>
                <Link href="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="xs:h-6 xs:w-6 md:h-8 md:w-8"
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
                </Link>
              </li>
              <li>
                <Link href="">
                  <picture>
                    <img
                      src="https://s2.svgbox.net/hero-outline.svg?ic=cog&color=000"
                      className="xs:h-6 xs:w-6 md:h-8 md:w-8"
                      alt="settings"
                    />
                  </picture>
                </Link>
              </li>
              <li className="flex mt-auto">
                <form method="POST" action="/api/logout">
                  <button type="submit">
                    <picture>
                      <img
                        src="https://s2.svgbox.net/materialui.svg?ic=logout&color=000"
                        className="xs:h-6 xs:w-6 md:h-8 md:w-8"
                        alt="logout"
                      />
                    </picture>
                  </button>
                </form>
              </li>
            </ul>

            <div className="bg-base-200 py-10 xs:px-6 md:px-10 ">
              <div className="flex mb-10  w-full h-fit">
                <h2 className="font-bold xs:mr-8  xs:text-base md:text-xl w-fit h-fit  ">
                  User’s Projects
                </h2>
                <label
                  htmlFor="my-drawer-4"
                  className="drawer-button btn bg-black flex sm:ml-4 md:ml-auto normal-case w-auto h-fit xs:px-2 xs:py-2 md:px-6 md:py-3"
                >
                  <span className="xs:text-sm md:text-lg mr-2"> + </span>
                  <span className="xs:text-sm md:text-lg">New project</span>
                </label>
              </div>

              <div className="relative flex justify-center items-center xs:w-fit md:w-full ">
                <span className="absolute xs:text-sm md:text-lg left-2 bottom-7 ">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search filter"
                  className="input input-bordered xs:w-fit md:w-full  rounded-full bg-gray-300 mb-4 focus:outline-none xs:placeholder:pl-[20px] md:placeholder:pl-[14px] xs:px-3 md:px-8"
                  onChange={(evt) => setSearchTerm(evt.currentTarget.value)}
                />
              </div>

              <div className=" w-screen  overflow-auto  border border-black">
                <table className="table  w-full h-full ">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th> 🔑 id</th>
                      <th>🪪 name</th>
                      <th>url</th>
                    </tr>
                  </thead>
                  {/* body */}
                  <tbody>
                    {projects
                      .filter((sm) => sm.name.includes(searchTerm))
                      .map((p, idx) => {
                        return (
                          <tr key={p.id} className="hover cursor-pointer">
                            <th>{idx}</th>
                            <td>{p.id}</td>
                            <td>{p.name}</td>
                            <td>
                              <Link
                                target="_blank" // renders the url of the selected project in another page
                                href={`${p.url}`}
                                className="hover:underline"
                              >
                                {p.url}
                              </Link>
                            </td>
                            <td>
                              <button
                                type="button"
                                onClick={() => {
                                  axios
                                    .delete(`/api/projects?id=${p.id}`)
                                    .then((response) => {
                                      setProjects(
                                        projects.filter((pr) => pr.id !== p.id)
                                      );
                                    });
                                }}

                                // deletes the selected project and saves the new list of projects
                              >
                                🗑️
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
          <div
            className={
              "flex px-6 pt-4 pb-4 w-fit h-screen bg-base-100 text-base-content "
            }
          >
            {/* <!-- Sidebar content here --> */}
            <div className="flex flex-col w-fit h-full ">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  axios
                    .post("/api/projects", {
                      name: projectName,
                      url: projectUrl,
                    })
                    .then((response) => {
                      setProjects([...projects, response.data]);
                    });
                  setProjectName("");
                  setProjectUrl("");
                }}
                // adds the new project , saves the new list of projects and clears the project name and url states
              >
                <h1 className="mb-6 text-lg">User’s New Project</h1>
                <div className="divider"></div>
                <div className="flex flex-col gap-4 h-full">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="project name" className="text-sm ">
                      🇹 Project name
                    </label>
                    <input
                      id="project name"
                      type="text"
                      value={projectName}
                      className="input input-bordered w-full  rounded-md bg-gray-300  focus:outline-none  px-6"
                      required
                      onChange={(evt) =>
                        setProjectName(evt.currentTarget.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="url" className="text-sm">
                      🔗 Url
                    </label>
                    <input
                      value={projectUrl}
                      id="url"
                      type="url"
                      placeholder="https://www.flowbite.com"
                      className="peer input input-bordered w-full  rounded-md bg-gray-300  focus:outline-none invalid:border-pink-500 invalid:ring-pink-500 px-6"
                      required
                      onChange={(evt) => setProjectUrl(evt.currentTarget.value)}
                    />
                    <p className="invisible mt-2 text-sm text-pink-600 peer-invalid:visible">
                      Please provide a valid email address.
                    </p>
                  </div>
                  <div className="flex  justify-end items-end mt-auto ">
                    <div className="form-control">
                      <div className="flex gap-2 mb-2">
                        <label
                          htmlFor="my-drawer-4"
                          className="drawer-button btn bg-transparent border-none text-black hover:bg-gray-300 normal-case w-auto h-fit px-12 py-3"
                        >
                          Cancel
                        </label>
                        <label
                          htmlFor="my-drawer-4"
                          className="drawer-button btn bg-black  normal-case w-auto h-fit px-12 py-3"
                        >
                          <button type="submit">Create</button>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async function getServerSideProps(ctx) {
    return accessLevel("admin", ctx);
  }
);
