import React, { useState } from "react";
import customFetch from "../../utils";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import Pagination from "../../components/Pagination";
import AdminPageShell from "../../components/AdminPageShell";
import StatusState from "../../components/StatusState";

const getAllFights = () => {
  return {
    queryKey: ['fights'],
    queryFn: async () => {
      const response = await customFetch.get('/fights', { withCredentials: true });
      return response.data;
    }
  }
}

export const loader = (queryClient) => async () => {
  await queryClient.ensureQueryData(getAllFights())
  return null;
}

const Fights = () => {
  const { data } = useQuery(getAllFights())
  const [fights, setFights] = useState(data.fights || []);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const handleDelete = async (id) => {
    try {
      await customFetch.delete("/fights/" + id, { withCredentials: true });
      toast.success("Deleted fight");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete fight");
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (e.target.value) {
      const filteredFights = data.fights.filter((fight) =>
        fight.fighter1ID?.fighterName?.toLowerCase().includes(searchValue) ||
        fight.fighter2ID?.fighterName?.toLowerCase().includes(searchValue) ||
        fight.eventID?.name?.toLowerCase().includes(searchValue)
      );
      setFights(filteredFights);
    } else {
      setFights(data.fights)
    }
    setCurrentPage(0)
  }

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const getPaginatedFights = () => {
    const offset = currentPage * itemsPerPage;
    return fights.slice(offset, offset + itemsPerPage);
  };

  return (
    <AdminPageShell
      eyebrow="Admin"
      title="Fights"
      description="Manage bouts, winners, finishes, and event card placement."
      action={
        <>
          <Link to="/fights/create" className="admin-create">
            Create fight
          </Link>
          <input className="admin-search" type="text" onChange={handleSearch} placeholder='Search fighters' />
        </>
      }
      stats={[
        { label: 'Showing', value: fights.length },
        { label: 'Total', value: data.fights?.length || 0 },
      ]}
    >
    <Wrapper>
      {fights.length === 0 && (
        <StatusState
          variant="compact"
          eyebrow="Fights"
          title="No fights found"
          message="Create a fight or adjust the search to see bout records here."
        />
      )}
      <div className="fights">
        {getPaginatedFights().map((fight) => {
          const { eventID, fighter1ID, fighter2ID, winnerID, finishID, weightClassID, round, seconds, minute } = fight;
          const fighter1Name = fighter1ID?.fighterName || 'TBD fighter';
          const fighter2Name = fighter2ID?.fighterName || 'TBD fighter';
          const winnerName = winnerID?.fighterName || 'N/A';
          const eventName = eventID?.name || 'Unassigned event';
          const weightClassName = weightClassID?.className || 'Open weight';
          const finishType = finishID?.finishType || 'Method pending';
          const hasResult = Boolean(winnerID);

          return <article key={fight._id} className="fight" >
            <div className="fight-head">
              <p>{weightClassName}</p>
              <h2>{eventName}</h2>
              <h4>{fighter1Name} vs {fighter2Name}</h4>
            </div>
            <div className="info">
              <p>Winner: <span>{winnerName}</span></p>
              {hasResult && <p className="time">Time: <span>{round || 'N/A'} round, {minute ?? 'N/A'} minute, {seconds ?? 'N/A'} seconds</span></p>}
              {hasResult && <p className="method">Method: <span>{finishType}</span></p>}
            </div>
            <div className="actions">
              <Link
                to={`/fights/update/${fight._id}`}
                className="admin-action primary"
              >
                Update
              </Link>
              <button
                className="admin-action danger"
                onClick={(e) => handleDelete(fight._id)}
              >
                Delete
              </button>
            </div>
          </article>
        })}
      </div>
      {fights.length > itemsPerPage && (
        <Pagination
          pageCount={Math.ceil(fights.length / itemsPerPage)}
          onPageChange={handlePageClick}
          currentPage={currentPage}
        />
      )}
    </Wrapper>
    </AdminPageShell>
  );
};

const Wrapper = styled.section`
  .fights{
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
  .fight{
      display: grid;
      gap: 1rem;
      align-content: start;
      min-height: 300px;
      border: 1px solid var(--grey-200);
      border-radius: 8px;
      background-color: var(--white);
      box-shadow: 0 16px 40px rgba(15, 15, 18, 0.08);
      padding: 1rem;
      .fight-head p{
        margin: 0 0 0.5rem;
        color: #d20a0a;
        font-size: 0.72rem;
        font-weight: 900;
        text-transform: uppercase;
      }
      h2{
        margin: 0;
        color: #171719;
        font-size: 1.25rem;
        line-height: 1;
        text-transform: uppercase;
      }
      h4{
        margin: 0.5rem 0 0;
        color: var(--grey-600);
        font-size: 0.94rem;
        font-weight: 900;
        text-transform: uppercase;
      }
      .info p{
        color:var(--grey-700);
        margin: 0.55rem 0 0;
        span{
          font-weight: 900;
          color: #171719;
        }
      }
      .actions{
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: auto;
        align-items: center;
      }
    }

`

export default Fights;
