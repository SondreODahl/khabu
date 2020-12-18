import React from 'react';
import HomeButton from '../home-button/HomeButton';

import './RulesPage.css';

/*
  THIS PAGE IS IMPORTED FROM NOTION. NOT WRITTEN EXPLICITLY BY US. 
*/

const RulesPage = () => (
  <div>
    <HomeButton />
    <div className={'ui hidden divider'} />
    <div class="page-body">
      <h3 id="24becfa5-9df3-4026-a7e2-38006549970e" class="">
        Start of game
      </h3>
      <ul id="bb11cea3-4b2b-440c-af71-88b2aadffeca" class="bulleted-list">
        <li>Each player starts with a deck of X (even) cards</li>
      </ul>
      <ul id="ef85d8d8-6e33-429d-8740-dec42816b03d" class="bulleted-list">
        <li>
          Each player may look at half of their own cards for a limited time (5 sec *
          cards). Afterwards, all cards are flipped with the backside up.{' '}
        </li>
      </ul>
      <ul id="a1233592-3f42-4ab1-bb2e-c7d4d15d2ebc" class="bulleted-list">
        <li>Shuffled deck of cards of which to draw from</li>
      </ul>
      <ul id="58ab030e-ea29-42be-8975-a17fa935142f" class="bulleted-list">
        <li>Randomized starting player</li>
      </ul>
      <p id="244d0f92-63f1-4026-9be2-f513d4fa314e" class=""></p>
      <h3 id="de1febc7-0605-4b0d-a432-cd49bc1eed7b" class="">
        Player turn
      </h3>
      <p id="e95b8e11-0f08-42df-93d2-dee0a90f97da" class="">
        When the turn starts, the player has three main choices:
      </p>
      <ol id="caca8f48-12fd-4b4a-b5a8-ec910b083de9" class="numbered-list" start="1">
        <li>
          The player may swap the card lying face-up with one of his own. He does not
          get to use the effect.
        </li>
      </ol>
      <ol id="d447e33d-8136-4fd8-b307-9ef6c84ac034" class="numbered-list" start="2">
        <li>The player may draw a card from the shuffled deck.</li>
      </ol>
      <ol id="8ac49df9-c322-43c4-84ad-1e616a7326ea" class="numbered-list" start="3">
        <li>The player may call &quot;Khabu&quot;. See &quot;Khabu&quot;</li>
      </ol>
      <p id="745f3ed0-9970-4635-a25a-320e43edc7d2" class="">
        There are three possible actions upon drawing a card:
      </p>
      <div id="e8b21bad-c79c-41dc-9edb-92fc1d510c03" class="column-list">
        <div
          id="11710647-6991-42f7-8e93-37e10fae15fb"
          style={{ width: '33.33333333333333%' }}
          class="column"
        >
          <p id="9d92db80-8f8a-4dc5-8401-5a898aac0e65" class="">
            The player may swap the drawn card with one of their other cards.
            <div class="indented">
              <ul id="2eb1b397-4070-4d2e-92cc-69006421c5db" class="bulleted-list">
                <li>
                  The swapped card is then placed face-up onto the discard pile
                </li>
              </ul>
              <p id="3626bcf4-75c6-4370-9da6-d8bdeee35317" class=""></p>
            </div>
          </p>
        </div>
        <div
          id="c16252ae-2dfc-4422-9c70-fd80cd43eff0"
          style={{ width: '33.3333333333334%' }}
          class="column"
        >
          <p id="ba2176d9-08c0-42b1-9bc3-c79d9bdf13f2" class="">
            The player may put the card face-up onto the discard pile without taking
            any other action
          </p>
          <p id="93a9ca22-a1f7-48bb-b1e9-660a4ca85547" class=""></p>
        </div>
        <div
          id="37072acd-5d8b-4127-9b48-7a665e50f99b"
          style={{ width: '33.33333333333333%' }}
          class="column"
        >
          <p id="a71383dc-0917-42a6-b55c-727ad4b70297" class="">
            If the player placed an effect card onto the discard pile, he must use
            that effect on the same turn.
          </p>
          <p id="94d4fd8f-a077-4df9-a6b5-a97fcafee964" class=""></p>
        </div>
      </div>
      <p id="17d8a57c-cc2c-4065-844e-bd723ab94e02" class="">
        At any time except when drawing, the player may take any card (even one of
        his/hers opponents) and place onto the discard pile (REPEATABLE)
        <div class="indented">
          <ul id="6d6baad3-7204-4eb3-b535-68adfacc8dac" class="bulleted-list">
            <li>
              If the card&#x27;s number match the top-card&#x27;s number in the
              discard pile, the player may put one card from his deck into the
              opponent&#x27;s deck
            </li>
          </ul>
          <ul id="6d7b0109-bc83-45f1-8b3f-0389ed7c6c49" class="bulleted-list">
            <li>
              If the card&#x27;s number does not match the top-card&#x27;s number in
              the discard pile, the player must draw another card from the central
              deck and place it in his own deck without looking at the card.
            </li>
          </ul>
          <ul id="94fe4df6-5f71-4d8c-ac22-3248b0a21267" class="bulleted-list">
            <li>
              PS: ANY player may do this, no matter if it is their turn or not. After
              a player has done the action, the other players can not do it on the
              same turn after that player.
            </li>
          </ul>
          <p id="61b7b81a-0f04-41c2-8676-94d32db8fd15" class=""></p>
        </div>
      </p>
      <h3 id="c4b1dc37-086a-406d-be22-9ed47c6bf505" class="">
        Khabu
      </h3>
      <ul id="fa73cbe8-0b10-4fcd-a3fb-da0de0f15eb8" class="bulleted-list">
        <li>
          The player may call &quot;Khabu!&quot; if the player believes he/she has
          the lowest score among the players <mark class="highlight-red">NB</mark>:
          Can only be done before drawing a card. See &quot;End of round&quot; for
          more details
          <ul id="077ae98f-3e8f-4e8d-b01c-e1f8c0ead74a" class="bulleted-list">
            <li>
              Upon calling &quot;Khabu!&quot; each player except the player calling
              &quot;Khabu!&quot; has 1 last turn left
            </li>
          </ul>
          <ul id="a23bab0f-e9ac-4c13-a77d-f9f4c38e973d" class="bulleted-list">
            <li>
              The other players may not interfere with cards of the player that
              called &quot;Khabu!&quot;, but can interfere with each other and their
              own cards
            </li>
          </ul>
        </li>
      </ul>
      <p id="99a71d09-0b08-444d-8bde-c2bd03e87abe" class=""></p>
      <h3 id="9bd2cb97-b50f-4fe2-8e95-b166690eb5fb" class="">
        Ending a turn
      </h3>
      <ul id="7f98c7fa-0bd9-415b-b845-c5674608dd65" class="bulleted-list">
        <li>
          After a player has drawn a card and chosen what to do with the card, the
          player may press end turn to pass the turn on to next player.
        </li>
      </ul>
      <p id="c1900a74-85d3-4ff0-879a-790088c96640" class=""></p>
      <h3 id="4dd7ef1e-bc6a-4936-b1cf-2776d4110218" class="">
        Card effects
      </h3>
      <ul id="a17598f0-8c3a-416f-bc13-9075f25ad22b" class="bulleted-list">
        <li>
          <strong>2-6</strong>: No effect
        </li>
      </ul>
      <ul id="99855a32-0ebd-4013-a466-7a540ba1432e" class="bulleted-list">
        <li>
          <strong>7-8</strong>: You may look at one of your own cards
        </li>
      </ul>
      <ul id="883c6277-e81e-4910-b684-e258fd2c4e51" class="bulleted-list">
        <li>
          <strong>9-10</strong>: You may look at one of the opponents&#x27; card
        </li>
      </ul>
      <ul id="abe3e56d-da60-450a-a889-62ea6d075424" class="bulleted-list">
        <li>
          <strong>Jack and queen</strong>: You may swap one card from a player with a
          card from another player (this includes yourself){' '}
        </li>
      </ul>
      <ul id="0ec25525-db63-458b-b127-e0ef91f74d67" class="bulleted-list">
        <li>
          <strong>Black kings</strong>: You may look at one card from a player, and
          then look at a card from another player. After looking at the cards you may
          swap them, but you can also leave the cards in the same spot.
        </li>
      </ul>
      <ul id="049b5e59-166a-4442-816a-3018de2c46f9" class="bulleted-list">
        <li>
          <strong>Red kings</strong>: Counts as -1, not 13 (has no effect)
        </li>
      </ul>
      <ul id="c25e56c3-abd2-484d-b8aa-d751152dc7b9" class="bulleted-list">
        <li>
          <strong>Ace</strong>: Counts as 1, not 14 (has no effect)
        </li>
      </ul>
      <p id="3401ea94-fb44-4897-812b-d5f4c96d7aac" class=""></p>
      <h3 id="ad358aed-8e2d-4609-bac1-50ef71591ac9" class="">
        End of round
      </h3>
      <ul id="a4b80bc9-dd33-4614-9f5a-d58114bc8cab" class="bulleted-list">
        <li>
          A round ends after player has called &quot;Khabu!&quot; and the remaining
          opponents have each had a last turn.{' '}
        </li>
      </ul>
      <ul id="9047d2bd-4237-4374-85d4-d61b45f8e1cb" class="bulleted-list">
        <li>
          Each player calculates their score by adding up the numbers on the card(s)
          still in their deck
        </li>
      </ul>
      <ul id="e3e0060b-847e-4a74-bac6-c409612885f9" class="bulleted-list">
        <li>
          The player with the lowest score wins
          <ul id="8fa9aaea-dd26-46fe-bf23-082023750e36" class="bulleted-list">
            <li>
              If the player that called &quot;Khabu!&quot; does not have the lowest
              score, the player has to add 20 points to their total score including
              the score calculated from the current round
            </li>
          </ul>
        </li>
      </ul>
      <ul id="c7dd692d-a983-4de5-8f51-a9ed6f945617" class="bulleted-list">
        <li>Every player adds their score from the round to their total score</li>
      </ul>
      <p id="0351ab95-acc7-477a-8df1-3e9f9906698b" class=""></p>
      <h3 id="5a01d60a-f644-43a8-a044-1e64e3d408c9" class="">
        End of game
      </h3>
      <ul id="db9a68b0-41b9-4698-8b56-36984be6631e" class="bulleted-list">
        <li>Player with lowest total score is the overall winner</li>
      </ul>
      <p id="f96beb2f-3d07-473e-b7e7-555bb8f679ac" class=""></p>
    </div>
  </div>
);

export default RulesPage;