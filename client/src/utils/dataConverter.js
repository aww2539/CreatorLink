const dateConverter = (timestamp) => {
    let date = new Date(timestamp)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

export default dateConverter