import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { commentIndexData } from './mocks/data/comments';
import { app } from './config/setupFile';

describe('comment', () => {
  describe('GET /comments', () => {
    it('should return a list of comments', async () => {
      const response = await request(app)
          .get('/comments');

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(commentIndexData);
    });
  });

  describe('GET /comments/:commentID', () => {
    it('should return a specific comment', async () => {
      const response = await request(app).get(`/comments/${commentIndexData[0].commentID}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(commentIndexData[0]);
    });

    it('should handle an invalid commentID', async () => {
      const invalidCommentID = 'invalid-id';
      const response = await request(app).get(`/comments/${invalidCommentID}`);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual({ error: 'Unable to find comment with ID invalid-id' });
    });
  });

  // describe('POST /comments', () => {
  //   it('should create a new comment', async () => {
  //     const newCommentData = {
  //       post: 'd209c8db-30dc-404c-a36b-4a8be95e482d',
  //       content: 'Content of Test Comment',
  //     };

  //     const response = await request(app)
  //       .post('/comments')
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(newCommentData);

  //     const { commentID, user, post } = response.body

  //     expect(response.status).toBe(StatusCodes.CREATED);
  //     expect(response.body).toEqual({
  //       commentID: commentID,
  //       user: user,
  //       post: 'd209c8db-30dc-404c-a36b-4a8be95e482d',
  //       content: 'Content of Test Comment',
  //     });
  //     createdCommentID = commentID;
  //   });

  //   it('should handle errors during comment creation', async () => {
  //     const invalidCommentData = {
  //     };

  //     const response = await request(app)
  //       .post('/comments')
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(invalidCommentData);

  //     expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  //     expect(response.body).toEqual({ error: 'Fields were not filled in properly' });
  //   });
  // });

  // describe('PUT /comments', () => {
  //   it('should update an existing comment', async () => {
  //     const updatedCommentData = {
  //       content: 'Updated Content of Test Comment',
  //     };

  //     const updateResponse = await request(app)
  //       .put(`/comments/${createdCommentID}`)
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(updatedCommentData);

  //     const { commentID, user, post } = updateResponse.body

  //     expect(updateResponse.status).toBe(StatusCodes.OK);
  //     expect(updateResponse.body).toEqual({
  //       commentID: commentID,
  //       user: user,
  //       post: post,
  //       content: 'Updated Content of Test Comment',
  //     });
  //   });

  //   it('should handle updating a non-existent comment', async () => {
  //     const nonExistentCommentID = 'nonExistentID';

  //     const updatedCommentData = {
  //       content: 'Updated Comment Content',
  //     };

  //     const updateResponse = await request(app)
  //       .put(`/comments/${nonExistentCommentID}`)
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(updatedCommentData);

  //     expect(updateResponse.status).toBe(StatusCodes.NOT_FOUND);
  //     expect(updateResponse.body).toEqual({ error: `Unable to update comment with ID ${nonExistentCommentID}` });
  //   });
  // });

  // describe('DELETE /comments/:commentID', () => {
  //   it('should delete an existing comment', async () => {
  //     const response = await request(app)
  //       .delete(`/comments/${createdCommentID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     expect(response.status).toBe(StatusCodes.NO_CONTENT);

  //     const deletedComment = await CommentModel.findOne({ commentID: createdCommentID });
  //     expect(deletedComment).toBeNull();
  //   });

  //   it('should handle deleting a non-existent comment', async () => {
  //     const nonExistentCommentID = 'nonExistentID';

  //     const response = await request(app)
  //       .delete(`/comments/${nonExistentCommentID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     expect(response.status).toBe(StatusCodes.NOT_FOUND);
  //     expect(response.body).toEqual({ error: `Unable to find comment with ID ${nonExistentCommentID}` });
  //   });
  // });
});
