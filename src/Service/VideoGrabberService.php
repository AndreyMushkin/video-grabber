<?php

namespace App\Service;

use Symfony\Component\HttpClient\HttpClient;

class VideoGrabberService
{
    const CODE_PREFIX = 'watch?v=';
    const CODE_LENGTH = 11;

    private $httpClient;

    public function __construct(HttpClient $httpClient)
    {
        $this->httpClient = $httpClient::create();
    }

    public function getFirstVideoLink(string $searchString): array
    {
        $content = $this->fetchVideoPageContent($searchString);

        return $this->parseFirstVideoLink($content);
    }

    private function parseFirstVideoLink(string $rawContent): array
    {
        $codeStartPos = stripos($rawContent, self::CODE_PREFIX) + strlen(self::CODE_PREFIX);
        $videoCode = substr($rawContent, $codeStartPos, self::CODE_LENGTH);

        return [
            'link' => "https://www.youtube.com/watch?v=$videoCode",
            'code' => $videoCode,
        ];
    }

    private function fetchVideoPageContent(string $searchString): string
    {
        $response = $this->httpClient->request('GET', "https://www.youtube.com/results?search_query=$searchString");

        return $response->getContent();
    }
}