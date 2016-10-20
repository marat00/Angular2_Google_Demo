import { Component, QueryList, ViewChildren } from '@angular/core';

import { YoutubeService } from '../services/youtube.service';

import { CardPlayEvent, SearchResultCardComponent, SearchResultState } from './search-result-card.component';

import { Video } from '../video';

const FAKE_RESULTS = [
  { description: '6 cat dances you need to watch today' },
  { description: 'You won\'t believe what this dog can do!' },
  { description: 'How hedgehogs are plotting against humanity' }
];

/**
 * Component for performing video search and displaying results.
 */
@Component({
  selector: 'search-videos',
  templateUrl: 'search/search-videos.component.html',
})
export class SearchVideosComponent {
  /* Container to hold the list of video results. */
  videoList: any[];
  
  /* The user's search term. Initialized to "cats". */
  searchTerm: string = 'cats';
  
  /* A query list containing all result cards. */
  // TODO(M9): Get ahold of all search result card components.

  constructor(private youtubeService: YoutubeService) {}

  /**
   * Enforce that only one video is playing at a time.
   * @param event The event that indicates if a user wants to play a video.
   */
  playOneCard(event: CardPlayEvent): void {
    for (let card of this.cards.toArray()) {
      card.state = event.target == card ? SearchResultState.PLAYER :
                                          SearchResultState.THUMBNAIL;
    }
  }

  /*
   * Fetch the list of videos from our YoutubeService.
   * @returns A promise that will resolve to the list of videos that match 
   *   our query.
   */
  fetch(): Promise {
    if (this.searchTerm != 'cats') {
      window.alert(`You wanted ${this.searchTerm}, but we only have cats. ` +
                   `Sorry!`);
    }
    return this.youtubeService.getVideos().then((response: any) => {
      this.videoList = response;
    });
  }
}