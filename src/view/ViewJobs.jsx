import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import "./ViewJobs.css";

export default function ViewJobs() {
  const [jobs, setJobs] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(savedJobs);
  }, []);

  const handleDelete = (id) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
  };
 
  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Job Title",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "company",
        header: "Company",
      },
      {
        accessorKey: "location",
        header: "Location",
      },
      {
        accessorKey: "jobType",
        header: "Job Type",
      },
      {
        accessorKey: "salary",
        header: "Salary",
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: (info) =>
          String(info.getValue()).length > 40
            ? String(info.getValue()).slice(0, 40) + "..."
            : info.getValue(),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const jobId = row.original.id;
          return (
            <AlertDialog.Root>
              <AlertDialog.Trigger asChild>
                <button className="delete-btn">Delete</button>
              </AlertDialog.Trigger>
              <AlertDialog.Portal>
                <AlertDialog.Overlay className="alert-overlay" />
                <AlertDialog.Content className="alert-content">
                  <AlertDialog.Title>Delete Job?</AlertDialog.Title>
                  <AlertDialog.Description>
                    Are you sure you want to delete this job?
                  </AlertDialog.Description>
                  <div className="alert-actions">
                    <AlertDialog.Cancel className="cancel-btn">
                      Cancel
                    </AlertDialog.Cancel>
                    <AlertDialog.Action
                      className="confirm-btn"
                      onClick={() => handleDelete(jobId)}
                    >
                      Delete
                    </AlertDialog.Action>
                  </div>
                </AlertDialog.Content>
              </AlertDialog.Portal>
            </AlertDialog.Root>
          );
        },
      },
    ],
    [jobs]
  );
 
  const table = useReactTable({
    data: jobs,
    columns,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      {}
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="/recruiter/view">📄 View Jobs</Link>
        </div>
      </nav>

      {}
      <div className="page-container">
        <div className="content-card">
          {}
          <div className="header-actions">
            <h2>Posted Jobs</h2>
            <Link to="/recruiter/create" className="create-job-btn">
              ➕ Create Job
            </Link>
          </div>

          {}
          <input
            className="search-input"
            placeholder="🔍 Search jobs..."
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />

          {}
          <div className="column-toggle">
            {table
              .getAllLeafColumns()
              .filter((col) => col.id !== "actions")
              .map((column) => (
                <label key={column.id}>
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                  />{" "}
                  {column.columnDef.header}
                </label>
              ))}
          </div>

          {}
          <div className="table-wrapper">
            <table>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted()] ?? null}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {}
          <div className="pagination">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              ⬅ Prev
            </button>
            <span>
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next ➡
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
