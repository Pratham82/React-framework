import React from "react"
import UserItem from "./UserItem"
import Spinner from "../layout/Spinner"
import PropTypes from "prop-types"

const Users = ({ users, loading }) => {
  const usersStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "1rem",
  }

  return (
    <div style={usersStyle}>
      {loading ? (
        <Spinner />
      ) : (
        users.map((user) => <UserItem user={user} key={user.id} />)
      )}
    </div>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default Users
