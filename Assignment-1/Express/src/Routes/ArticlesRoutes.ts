import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ArticleController from '../Controllers/ArticleController';
import isAdmin from '../Middleware/is-admin';
import isLoggedIn from '../Middleware/is-logged-in';

const router = Router();

/**
 * @api {get} /api/articles/categories Get Article Categories
 * @apiName GetArticleCategories
 * @apiGroup Articles
 *
 * @apiDescription Get a list of article categories.
 *
 * @apiSuccess {String[]} categories List of article categories.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "categories": ["Anxiety Management", "Air Travel Worries", ...]
 *     }
 *
 * @apiError (Server Error) {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "An error occurred"
 *     }
 */
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const result = await ArticleController.getArticleCategories();
    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

/**
 * @api {get} /api/articles Get Articles
 * @apiName GetArticles
 * @apiGroup Articles
 *
 * @apiDescription Get a list of articles based on category (optional).
 *
 * @apiParam {String} [category] Optional category filter.
 *
 * @apiSuccess {Object[]} articles List of articles.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *           "articleID": "a6a4fc31-4e9c-4e91-9d8b-4e0c8eb23a75",
 *           "title": "Serenity in the Sky: Relaxing Techniques for Nervous Flyers",
 *           "description": "Overcome flight anxiety with effective relaxation techniques designed to bring calm and comfort to your journey.",
 *           "content": "Flight anxiety is a common issue, but there are effective relaxation techniques that can help ease your nerves. Breathing exercises, visualization methods, and positive affirmations can provide comfort and calm during your journey. By practicing these techniques, you can transform your flight into a serene and enjoyable experience.",
 *           "category": "Relaxation techniques",
 *           "image": "relaxation-techniques-2"
 *       },
 *       {
 *           "articleID": "e18913a7-55a5-4a5b-9c6e-9d2567985a86",
 *           "title": "Mindfulness in the Skies: Finding Peace at 30,000 Feet",
 *           "description": "Discover how mindfulness practices can enhance your in-flight experience and reduce travel-related stress.",
 *           "content": "Travel-related stress can be overwhelming, but mindfulness practices offer a solution. By staying present and focused on the journey, you can let go of worries and fully enjoy the experience. Meditation, deep breathing, and simple mindfulness exercises can make a significant difference in how you perceive air travel. Embrace mindfulness, and the skies will become a place of serenity and peace.",
 *           "category": "Mindfulness",
 *           "image": "mindfulness-1"
 *       },
 *       // ... (Other articles go here)
 *     ]
 *
 * @apiError (Server Error) {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "An error occurred"
 *     }
 */
router.get('', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;

    const result = await ArticleController.getArticles(category);
    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

/**
 * @api {get} /api/articles/:articleID Get Article by ID
 * @apiName GetArticleByID
 * @apiGroup Articles
 *
 * @apiDescription Get an article by its ID.
 *
 * @apiParam {String} articleID Article's unique ID.
 *
 * @apiSuccess {Object} article The article.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "articleID": "b47ddeef-7f57-4a13-909f-5b5f0f993fcc",
 *       "title": "Fasten Your Seatbelts: What You Need to Know About Turbulence",
 *       "description": "Recent incidents with turbulence during air travel raise questions about this challenging weather phenomenon. Here’s what we know about it and how to stay safe.",
 *       "content": "Recent research indicates that turbulence is rising and that this change is sparked by climate change, specifically elevated carbon dioxide emissions affecting air currents. Turbulence can be a bumpy experience, but understanding the science behind it can help alleviate fears. Airplanes are designed to withstand turbulence, and pilots are trained to navigate through it safely. So, the next time you encounter turbulence during your flight, remember that it's a natural occurrence, and you are in safe hands.",
 *       "category": "Education and information",
 *       "image": "education-and-information-1"
 *     }
 *
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to find article with ID {articleID}"
 *     }
 *
 * @apiError (Server Error) {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "An error occurred"
 *     }
 */
router.get('/:articleID', async (req: Request, res: Response) => {
  try {
    const result = await ArticleController.getArticle(req.params.articleID);

    if (result) {
      res
          .status(StatusCodes.OK)
          .json(result);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: `Unable to find article with ID ${req.params.articleID}` });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An error occurred' });
  }
});

/**
 * @api {post} /api/articles Create Article
 * @apiName CreateArticle
 * @apiGroup Articles
 *
 * @apiDescription Create a new article.
 *
 * @apiBody {String} title Article title.
 * @apiBody {String} description Article description.
 * @apiBody {String} content Article content.
 * @apiBody {String} category Article category.
 *
 * @apiSuccess {Object} article The created article.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 201 Created
 *      {
 *        "articleID": "5bc084fe-6f6c-429d-8288-c41d492b3306",
 *        "title": "Test post",
 *        "description": "All about testing the article post function",
 *        "content": "Lorem ipsum color du se mit",
 *        "category": "Anxiety Management"
 *      }
 *
 * @apiError (Bad Request) {json} Error Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "Fields were not filled in properly"
 *     }
 */
router.post('', isLoggedIn, isAdmin, async (req: Request, res: Response) => {
  try {
    const article = await ArticleController.createArticle(req.body, req.files);

    if (article) {
      res
          .status(StatusCodes.CREATED)
          .json(article);
    }
  } catch (error) {
    res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Fields were not filled in properly' });
  }
});

/**
 * @api {put} /api/articles/:articleID Update Article by ID
 * @apiName UpdateArticleByID
 * @apiGroup Articles
 *
 * @apiDescription Update an article by its ID.
 *
 * @apiParam {String} articleID Article's unique ID.
 * @apiBody {String} title Article title.
 * @apiBody {String} description Article description.
 * @apiBody {String} content Article content.
 * @apiBody {String} category Article category.
 *
 * @apiSuccess {Object} article The updated article.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "articleID": "b47ddeef-7f57-4a13-909f-5b5f0f993fcc",
 *       "title": "Fasten Your Seatbelts: What You Need to Know About Turbulence",
 *       "description": "All about testing the article put function",
 *       "content": "Lorem ipsum color du se mit is updated",
 *       "category": "Education and information",
 *       "image": "education-and-information-1"
 *     }
 *
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to update article with ID {articleID}"
 *     }
 *
 * @apiError (Server Error) {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "error": "Fields were not filled in properly"
 *     }
 */
router.put('/:articleID', isLoggedIn, isAdmin, async (req: Request, res: Response) => {
  try {
    const updatedArticle = await ArticleController.updateArticle(req.params.articleID, req.body);

    if (updatedArticle) {
      res
          .status(StatusCodes.OK)
          .json(updatedArticle);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: `Unable to update article with ID ${req.params.articleID}` });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Field were not filled in properly' });
  }
});

/**
 * @api {delete} /api/articles/:articleID Delete Article by ID
 * @apiName DeleteArticleByID
 * @apiGroup Articles
 *
 * @apiDescription Delete an article by its ID.
 *
 * @apiParam {String} articleID Article's unique ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTP/1.1 204 No Content
 *     "Successfully deleted article with ID {articleID}"
 *
 * @apiError (Not Found) {json} Error Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Unable to find article with ID {articleID}"
 *     }
 *
 * @apiError (Server Error) {json} Error Response:
 *     HTTP/1.1 500 Internal Server Error
 */
router.delete('/:articleID', isLoggedIn, isAdmin, async (req: Request, res: Response) => {
  try {
    const result = await ArticleController.deleteArticle(req.params.articleID);

    if (result) {
      res
          .sendStatus(StatusCodes.NO_CONTENT)
          .json(`Successfully deleted article with ID ${req.params.articleID}`);
    } else {
      res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: `Unable to find article with ID ${req.params.articleID}` });
    }
  } catch (error) {
    res
        .status(StatusCodes.INTERNAL_SERVER_ERROR);
  }
});

export default router;
