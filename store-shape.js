store = {
    session: {},
    spots: {
      // There are two different routes for getting a spot.

      //GET ALL SPOTS
      allSpots: {
        [spotId]: {
          spotData,
        },
      },

      //GET SPOT BY SPOTID
      singleSpot: {
        spotData,
        SpotImages: [imagesData],
        Owner: {
          ownerData,
        },
      },
    },

    reviews: {
      // GET REVIEW BY SPOTID
      spot: {
        //GET SINGLE REVIEW BY REVIEWID FOR A SPOT
        [reviewId]: {
          reviewData,
          User: {
            userData,
          },
          ReviewImages: [imagesData],
        },
      },


      // GET REVIEWS BY USERID
      user: {
        //GET SINGLE REVIEW BY REVIEWID FOR A USER
        [reviewId]: {
          reviewData,
          User: {
            userData,
          },
          Spot: {
            spotData,
          },
          ReviewImages: [imagesData],
        },
      },
    },
  };
