<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IndexController extends AbstractController
{
    /**
     * @Route("/", name="homepage")
     */
    public function index(): Response
    {
        if (isset($_GET) && isset($_GET['obj'])) {
            try {
                $obj = json_decode($_GET['obj']);
                return $this->render('index.html.twig', ['obj' => $obj]);
            } catch (\Exception $e) {
                die("Error while import...");
            }
        }
        return $this->render('index.html.twig');
    }
}
