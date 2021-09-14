


export default {

   async moveLinkUp(id, orderNumber, idOfLinkAbove, orderNumberOfLinkAbove) {
        // 2 patches. one adding 1 to the order of the chosen link. one subtracting 1 from the order property of the link above
    
            const chosenLinkData = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    order: orderNumber - 1
                })
            }

            const otherLinkData = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    order: orderNumberOfLinkAbove + 1
                })
            }
    
            await fetch(`http://localhost:8088/profileLinks/${id}`, chosenLinkData)
            .then(() => {fetch(`http://localhost:8088/profileLinks/${idOfLinkAbove}`, otherLinkData)})

    },

    async moveLinkDown(id, orderNumber, idOfLinkBelow, orderNumberOfLinkBelow) {
        // 2 patches. one adding 1 to the order of the chosen link. one subtracting 1 from the order property of the link above
    
            const chosenLinkData = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    order: orderNumber + 1
                })
            }

            const otherLinkData = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    order: orderNumberOfLinkBelow - 1
                })
            }
    
            await fetch(`http://localhost:8088/profileLinks/${id}`, chosenLinkData)
            .then(() => {fetch(`http://localhost:8088/profileLinks/${idOfLinkBelow}`, otherLinkData)})
    }
}