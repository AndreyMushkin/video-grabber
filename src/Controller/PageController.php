<?php


namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use App\Service\VideoGrabberService;

class PageController extends AbstractController
{
    /**
     * @Route ("/", name="video_page", methods={"GET"})
     */
    public function page(): Response
    {
        return $this->render('pages/page.html.twig');
    }

    /**
     * @Route ("/search", name="video_search", methods={"POST"})
     */
    public function search(Request $request, VideoGrabberService $grabberService): JsonResponse
    {
        $decodedData = json_decode($request->getContent(), true);

        $response = $grabberService->getFirstVideoLink($decodedData['searchString']);

        return new JsonResponse($response);
    }
}