


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
    
            return await fetch(`https://creator-link-api-wod88.ondigitalocean.app/profileLinks/${id}`, chosenLinkData)
            .then(() => { return fetch(`https://creator-link-api-wod88.ondigitalocean.app/profileLinks/${idOfLinkAbove}`, otherLinkData)})

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
    
            return await fetch(`https://creator-link-api-wod88.ondigitalocean.app/profileLinks/${id}`, chosenLinkData)
            .then(() => {return fetch(`https://creator-link-api-wod88.ondigitalocean.app/profileLinks/${idOfLinkBelow}`, otherLinkData)})
    }
}