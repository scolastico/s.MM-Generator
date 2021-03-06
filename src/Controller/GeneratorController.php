<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class GeneratorController extends AbstractController
{

    /**
     * @Route("/api/generate", name="generator")
     */
    public function number(): Response
    {
        $response = new Response();
        $response->setStatusCode(Response::HTTP_BAD_REQUEST);
        $request = Request::createFromGlobals();
        if (!$request->request->has('obj')) {
            $response->setContent("no obj");
            return $response;
        }
        try {
            $obj = json_decode($request->request->get('obj'));
        } catch (\Exception $e) {
            $response->setContent("no json");
            return $response;
        }
        try {
            return $this->render('class.java.twig', ['obj' => $obj]);
        } catch (\Exception $e) {
            $response->setContent("not valid");
            return $response;
        }
    }

}