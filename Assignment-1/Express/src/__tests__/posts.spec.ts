import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import { postDetailIndex, simplePostIndexData } from './mocks/data/posts';
import { app } from './config/setupFile';

describe('post', () => {
  describe('GET /posts', () => {
    it('should return a list of posts', async () => {
      const response = await request(app)
          .get('/posts');

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(simplePostIndexData);
    });
  });

  describe('GET /posts/:postID', () => {
    it('should return a specific post', async () => {
      const response = await request(app).get(`/posts/${postDetailIndex[0].postID}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(postDetailIndex[0]);
    });

    it('should handle an invalid postID', async () => {
      const invalidPostID = 'invalid-id';
      const response = await request(app).get(`/posts/${invalidPostID}`);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toEqual({ error: 'Unable to find post with ID invalid-id' });
    });
  });

  // describe('POST /posts', () => {
  //   it('should create a new post', async () => {
  //     const newPostData = {
  //       title: 'Test Post',
  //       content: 'Content of Test Post',
  //       category: 'Category of Test Post',
  //     };

  //     const response = await request(app)
  //       .post('/posts')
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(newPostData);

  //     const { postID, user, dislikes, likes } = response.body

  //     expect(response.status).toBe(StatusCodes.CREATED);
  //     expect(response.body).toEqual({
  //       postID: postID,
  //       user: user,
  //       title: 'Test Post',
  //       content: 'Content of Test Post',
  //       category: 'Category of Test Post',
  //       dislikes: dislikes,
  //       likes: likes
  //     });
  //     createdPostID = postID;
  //   });

  //   it('should handle errors during post creation', async () => {
  //     const invalidPostData = {
  //       title: 'New Post Title',
  //     };

  //     const response = await request(app)
  //       .post('/posts')
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(invalidPostData);

  //     expect(response.status).toBe(StatusCodes.BAD_REQUEST);
  //     expect(response.body).toEqual({ error: 'Fields were not filled in properly' });
  //   });
  // });

  // describe('PUT /posts', () => {
  //   it('should update an existing post', async () => {
  //     const updatedPostData = {
  //       title: 'Updated Post Title',
  //       content: 'Updated Post Content',
  //       category: 'Updated Post Category',
  //     };

  //     const updateResponse = await request(app)
  //       .put(`/posts/${createdPostID}`)
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(updatedPostData);

  //     const { postID, user, dislikes, likes } = updateResponse.body

  //     expect(updateResponse.status).toBe(StatusCodes.OK);
  //     expect(updateResponse.body).toEqual({
  //       postID: postID,
  //       user: user,
  //       title: 'Updated Post Title',
  //       content: 'Updated Post Content',
  //       category: 'Updated Post Category',
  //       dislikes: dislikes,
  //       likes: likes
  //     });
  //   });

  //   it('should handle updating a non-existent post', async () => {
  //     const nonExistentPostID = 'nonExistentID';

  //     const updatedPostData = {
  //       title: 'Updated Post Title',
  //       content: 'Updated Post Content',
  //       category: 'Updated Post Category',
  //     };

  //     const updateResponse = await request(app)
  //       .put(`/posts/${nonExistentPostID}`)
  //       .set('Authorization', `Bearer ${adminToken}`)
  //       .send(updatedPostData);

  //     expect(updateResponse.status).toBe(StatusCodes.NOT_FOUND);
  //     expect(updateResponse.body).toEqual({ error: `Unable to update post with ID ${nonExistentPostID}` });
  //   });
  // });

  // describe('DELETE /posts/:postID', () => {
  //   it('should delete an existing post', async () => {
  //     const response = await request(app)
  //       .delete(`/posts/${createdPostID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     expect(response.status).toBe(StatusCodes.NO_CONTENT);

  //     const deletedPost = await PostModel.findOne({ postID: createdPostID });
  //     expect(deletedPost).toBeNull();
  //   });

  //   it('should handle deleting a non-existent post', async () => {
  //     const nonExistentPostID = 'nonExistentID';

  //     const response = await request(app)
  //       .delete(`/posts/${nonExistentPostID}`)
  //       .set('Authorization', `Bearer ${adminToken}`);

  //     expect(response.status).toBe(StatusCodes.NOT_FOUND);
  //     expect(response.body).toEqual({ error: `Unable to find post with ID ${nonExistentPostID}` });
  //   });
  // });
});
