import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Divider, Image, Table } from 'semantic-ui-react'

export default function Rules(props) {
    return (
        <Container>
        	<Header textAlign='center' as='h2'>Rules for the 2019 Season</Header>
        	<p>To view the full PONY rulebook, <a href='https://bsbproduction.s3.amazonaws.com/portals/10758/docs/rulebooks/2019%20pony%20baseball%20rulebook%20website.pdf'>click here.</a> To view division specific rules: <Link to='/rules/shetland'>Shetland</Link>, <Link to='/rules/pinto'>Pinto</Link>, <Link to='/rules/mustang'>Mustang</Link>, <Link to='/rules/bronco'>Bronco</Link>.</p>

        	<Segment>
        		<Header as='h3'>USA Bats</Header>
        		<Image size='small' floated='left' src='https://ecdn.liveclicker.net/8079A8/origin/thumbnails/2615/1066623350_1_Flv_512x288_thumb_2.jpg'></Image>
        		<p>
        			On January 1, 2018 USA Baseball will be implementing a rule change to the bats. If you are 14 years old or younger and play Little League®, Babe Ruth & Cal Ripken, PONY, Dixie or AABC, you will need to use a new bat marked with a new USA Baseball stamp: The bats currently on the market, which are marked with a 1.15BPF stamp, will no longer be legal for play in these leagues.
        			</p>
        			<p>
        			Additionally, beginning on January 1, 2018, under the new USA Baseball rule, all players 14 and under (not including Tee-Ball) will be able to use approved USA Baseball 2-5/8" barrels in Little League®, Babe Ruth & Cal Ripken, PONY, Dixie and AABC. USA Baseball stamps are not stickers for these divisions and it will be screen printed on the bat.
        			</p>
        			<p>
        				MPK Baseball & Softball will adhere and require all players to use USA Baseball stamped bats. Managers are responsible for checking their players bats and ensuring that they are using legal bats. Violation of this rule will result in the manager being ejected from the game in which the violation occurred.
        			</p>
        	</Segment>
        	<Segment>
        		<Header as='h3'>Helmets with C-Flaps</Header>
        		<Image size='small' floated='left' src='https://i.imgur.com/0UDHFVa.jpg'></Image>
        		<p>
        			Helmet attachments (c-flap, etc.) have recently become popular and are being used throughout baseball and softball. As we prepare for the tournament season, we have started to receive inquiries from our families, players and volunteers as to whether or not they are permitted in PONY competition.
        		</p>
        		<p>
        			Altering a helmet or any equipment in any way is not permitted and may cause the NOCSAE certification and warranty of that helmet to become void; thus, making it illegal in PONY play. If you have altered your helmet or intend to, please contact the helmet manufacturer to determine if altering the helmet will void the NOCSAE certification.
        		</p>
        		<p>There are helmets which meet this standard: Easton Junior Elite X Batting Helmet w/ Jaw Guard, Rawlings Youth MACH Batting Helmet w/ Flap.
        		</p>
        		<p>
        			When helmet shopping, look for the "Meets NOCSAE® standards" label.
        		</p>
        	</Segment>
        	<Segment>
        		<Header as='h3'>USA Baseball Pitch Smart</Header>
        		<Image size='small' floated='left' src='https://www.sportdev.org/images/USAB/All%20Headers/PitchSmart1.jpg'></Image>
        		<p>As will be stated in Section 10 “Pitching Rules” and T-8 “Tournament Pitching,” any team member may pitch, subject to the restrictions of the pitch count, as recommended by MLB Pitch Smart Guidelines, for age divisions Pinto 8U, Mustang 10U, Bronco 12U, Pony 14U, Colt 16U, Palomino 18U and Thorobred 23U. Players in the Shetland 6U age division are not permitted to pitch. Pitchers are to adhere to the chart below for league and sanction tournament play.</p>
        		<p>It is important for each league to set workload limits for their pitchers to limit the likelihood of pitching with fatigue. Research has shown that pitch counts are the most accurate and effective means of doing so. See required rest recommendations below.</p>
        		<Table>
        			<Table.Header>
        				<Table.Row>
        					<Table.HeaderCell>Age</Table.HeaderCell>
        					<Table.HeaderCell>Daily Max</Table.HeaderCell>
        					<Table.HeaderCell>0 Days Rest</Table.HeaderCell>
        					<Table.HeaderCell>1 Days Rest</Table.HeaderCell>
        					<Table.HeaderCell>2 Days Rest</Table.HeaderCell>
        					<Table.HeaderCell>3 Days Rest</Table.HeaderCell>
        					<Table.HeaderCell>4 Days Rest</Table.HeaderCell>
        					<Table.HeaderCell>5 Days Rest</Table.HeaderCell>
        				</Table.Row>
      				</Table.Header>
      				<Table.Body>
      					<Table.Row>
      						<Table.Cell>7-8</Table.Cell>
      						<Table.Cell>50</Table.Cell>
      						<Table.Cell>1-20</Table.Cell>
      						<Table.Cell>21-35</Table.Cell>
      						<Table.Cell>36-50</Table.Cell>
      						<Table.Cell>N/A</Table.Cell>
      						<Table.Cell>N/A</Table.Cell>
      						<Table.Cell>N/A</Table.Cell>
      					</Table.Row>
      					<Table.Row>
      						<Table.Cell>9-10</Table.Cell>
      						<Table.Cell>75</Table.Cell>
      						<Table.Cell>1-20</Table.Cell>
      						<Table.Cell>21-35</Table.Cell>
      						<Table.Cell>36-50</Table.Cell>
      						<Table.Cell>51-65</Table.Cell>
      						<Table.Cell>66+</Table.Cell>
      						<Table.Cell>N/A</Table.Cell>
      					</Table.Row>
      					<Table.Row>
      						<Table.Cell>11-12</Table.Cell>
      						<Table.Cell>85</Table.Cell>
      						<Table.Cell>1-20</Table.Cell>
      						<Table.Cell>21-35</Table.Cell>
      						<Table.Cell>36-50</Table.Cell>
      						<Table.Cell>51-65</Table.Cell>
      						<Table.Cell>66+</Table.Cell>
      						<Table.Cell>N/A</Table.Cell>
      					</Table.Row>
      					<Table.Row>
      						<Table.Cell>13-14</Table.Cell>
      						<Table.Cell>95</Table.Cell>
      						<Table.Cell>1-20</Table.Cell>
      						<Table.Cell>21-35</Table.Cell>
      						<Table.Cell>36-50</Table.Cell>
      						<Table.Cell>51-65</Table.Cell>
      						<Table.Cell>66+</Table.Cell>
      						<Table.Cell>N/A</Table.Cell>
      					</Table.Row>
      				</Table.Body>
        		</Table>
        	</Segment>
        </Container>
    )
}