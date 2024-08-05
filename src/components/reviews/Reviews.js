import { useEffect, useRef } from 'react';
import api from '../../api/axiosConfig';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';

import React from 'react'

const Reviews = ({ getSongData, song, reviews, setReviews }) => {

    const revText = useRef();
    let params = useParams();
    const songId = params.trackName; //////////////////////////////////CHANGED!!!!
    const allReviews = params.reviews;
    console.log(allReviews);
    console.log(songId);


    const getReviewsBySongTitle = async (songTitle) => {
        try {
            const response = await api.get(`https://music-discovery-api-3.onrender.com/api/v1/reviews/song/${songTitle}`);
            setReviews(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getSongData(songId);
        getReviewsBySongTitle(songId);
    }, [songId])


    const addReview = async (e) => {
        e.preventDefault();

        const rev = revText.current;

        try {
            const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, trackName: songId });

            // If reviews is not null, it spreads the existing reviews into a new array and adds a new review object to the end. 
            //If reviews is null, it creates a new array with just the new review object.
            const updatedReviews =
                reviews != null
                    ? [...reviews, { body: rev.value }]
                    : [{ body: rev.value }];

            rev.value = "";

            setReviews(updatedReviews);
        }
        catch (err) {
            console.error(err);
        }

    }

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <h4>{song?.trackName}</h4>
                    <img src={song?.poster} alt="" />

                </Col>
                <Col>
                    {
                        <>
                            <Row>
                                <Col>
                                    <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                        </>
                    }
                    {
                        song.reviewIds?.map((reviewId) => {
                            const review = reviews.find((review) => review.id === reviewId);
                            return <p key={reviewId}>{review?.body}</p>;
                        })
                    }
                    {
                        reviews?.map((r) => {
                            return (
                                <>
                                    <Row>
                                        <Col>{r.body}</Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <hr />
                                        </Col>
                                    </Row>
                                </>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews