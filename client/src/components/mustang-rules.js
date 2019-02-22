import React from 'react';
import { Container, Header, List, Label } from 'semantic-ui-react';

export default function MustangRules(props) {
	return (
		<Container>
			<Header as='h1' textAlign='center'>Mustang Rules for 2019</Header>

			<p>For any questions, contact the <a href='mailto:juanavalos@me.com'>Mustang Division Coordinator</a>.</p>

			<List>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Time Limit</List.Header>
						<List.Description>
							Games will drop dead at 1 hour and 45 minutes. No new inning can begin after 1 hour and 35 minutes. Games will also end if 6 innings are completed. Whichever comes first. 
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Field Dimensions</List.Header>
						<List.Description>
							The pitching distance is 46' from the tip of home plate to the front of the pitching rubber. Base distance is 60'.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Equipment</List.Header>
						<List.Description>
							All players are required to a wear a cup, girls recommended. No metal cleats are allowed.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Late Players</List.Header>
						<List.Description>
							If you have 9 players to start the game, but a player will be showing up late, let the umpire and other manager know they will be arrive late. Late players should be placed at the bottom of the line-up. If the player does not show up before the 9th position bats, it is an out the first time around. If the 9th position comes up again, it will not be an out and the player may not enter the game. 
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Player Unable To Bat</List.Header>
						<List.Description>
							If a player leaves the game for any reasons (with the exception of a medical need) it will be an automatic out the first time their batting position comes up. The second time will have no penalty.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Run Limit</List.Header>
						<List.Description>
							Maximum of 5 runs per inning. The 5th and 6th inning will have a maximum of 10 runs allowed.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Keeping Score & Reporting</List.Header>
						<List.Description>
							Scorebooks should be kept by both teams. The home team is the official scorebook during all games and their score will be final. All scores must be turned in by the home team within 24 hours after each game. No scores will be reported as losses. 
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Official Scores</List.Header>
						<List.Description>
							Final scores will be the score of the last <strong>completed</strong> inning. If time runs out and the inning is not completed, the score will revert back to the last completed inning. (Ex. 5-5 at the end of the 5th inning. In the 6th, away team scores 3 runs and time runs out while the home team is batting. The official score will read 5-5 since the final inning wasn't completed.)
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Participation</List.Header>
						<List.Description>
							Every player is required to play at least 2 innings.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Major League Baseball Rules Apply</List.Header>
						<List.Description>
							All MLB rules apply unless otherwise stated. Bunts allowed, stealing, lead-offs, drop 3rd strike, infield fly.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Pitch Counts</List.Header>
						<List.Description>
							Coaches must adhere to the USA Pitch Smart guidelines. Pitch counts do not reset when a new week starts. If both coaches agree, a scorekeeper can keep track of both teams pitch counts. However, coaches are responsible for adhering to the rules and will be penalized if players do not adhere to the Pitch Smart guidelines. If a player meets their maximum pitch count during an at-bat, they are allowed to complete the at-bat.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Manager Visits</List.Header>
						<List.Description>
							A manager can make only 2 visits to the mound. On their 3rd visit, the pitcher must be removed. Except in the event of an injury. 
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Pinch Running</List.Header>
						<List.Description>
							If there are 2 outs you can substitute a pinch runner for the pitcher and catcher. 
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Balks</List.Header>
						<List.Description>
							Each pitcher will get one warning for a walk. On the second balk, all runners will advance one base. After the halfway point of the season, there will be no warnings.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Protests</List.Header>
						<List.Description>
							Protests must be handled on the field at the time of any incident. There are NO protests once game play resumes from the incident. The game will continue to be played when under protest.
						</List.Description>
					</List.Content>
				</List.Item>
			</List>
		</Container>
	)
}