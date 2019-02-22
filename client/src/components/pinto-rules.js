import React from 'react';
import { Container, Header, List, Label } from 'semantic-ui-react';

export default function PintoRules(props) {
	return (
		<Container>
			<Header as='h1' textAlign='center'>Pinto Rules for 2019</Header>

			<p>For any questions, contact the <a href='mailto:admin@mpkbaseball.com'>Pinto Division Coordinator</a>.</p>

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
							The pitching distance is 40' from the tip of home plate to the front of the pitching rubber. Base distance is 60'.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Equipment</List.Header>
						<List.Description>
							All players are required to a wear a cup, girls recommended.
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
						<List.Header as='h4'>Bunting & Intentional Soft Swings</List.Header>
						<List.Description>
							Batters are not permitted to bunt or soft swing at a pitch. If a batter does, they will be called out and any runner advancing home is out.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Leading Off</List.Header>
						<List.Description>
							Runners are allowed to lead off, but may only do so after the pitch crosses home plate.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Stealing Bases</List.Header>
						<List.Description>
							Only 1 stolen base is allowed per pitch. On an attempted stolen base, the catcher gets a free throw to the base. The ball will be considered dead at that point and there is no advancement of any runner. There is no stealing bases during coach pitch.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>No Walks On Bases Loaded</List.Header>
						<List.Description>
							When the bases are loaded, the pitcher cannot walk the bases loaded. After ball 4, an eligible coach will throw 3 pitches from the rubber. If the batter is unable to put the ball in play, the batter is out. (There is no hit by pitch free base)
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Home Is Closed</List.Header>
						<List.Description>
							Home plate is closed and runners can only advance home if the ball is put in play by the batter. If a runner at third draws a throw from the catcher, the runner cannot advance home. However, if the runner is called out, the out will stand. Other runners may advance if there is a throw to third.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Defensive Positioning</List.Header>
						<List.Description>
							A defense may have 10 players on the field with 4 players in the outfield. 
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Infield Fly & Dropped 3rd Strike</List.Header>
						<List.Description>
							There is no infield fly rule. There is no dropped 3rd strike rule either.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Kid Pitch</List.Header>
						<List.Description>
							Kid pitch will begin at the start of the season. Coaches are required to follow USA Pitch Smart guidelines and have their forms signed off at the end of each game by the other coach. Curveballs will be ruled a no pitch. 
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
						<List.Header as='h4'>Hit By Pitch</List.Header>
						<List.Description>
							If a pitcher hits 3 batters in one inning, he must be removed and replaced with a new pitcher.
						</List.Description>
					</List.Content>
				</List.Item>
				<List.Item>
					<List.Icon name='baseball ball' />
					<List.Content>
						<List.Header as='h4'>Balks</List.Header>
						<List.Description>
							There are no balks, however pitchers must try to set themselves before the pitch. There is no penalty, but it must be corrected when it occurs. 
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