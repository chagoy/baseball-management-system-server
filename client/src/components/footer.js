import React from 'react';
import { Segment, Grid, Container, Header, List, Image } from 'semantic-ui-react';
require('./footer.css');

export default function Footer(props) {
	return (
		<Segment className='footer' inverted vertical style={{ padding: '5em 0em'}}>
			<Container>
				<Grid divided inverted stackable>
					<Grid.Row>
						<Grid.Column width={3}>
							<Header inverted as='h4' content='About' />
							<List link inverted>
								<List.Item as='a'>Sitemap</List.Item>
								<List.Item as='a'>Contact</List.Item>
								<List.Item as='a'>Whatever</List.Item>
							</List>
						</Grid.Column>
						<Grid.Column width={3}>
							<Header inverted as='h4' content='services' />
								<List link inverted>
									<List.Item as='a'>Banans</List.Item>
								</List>
						</Grid.Column>
						<Grid.Column width={7}>
							<Header as='h4' inverted>
								Our Partners
							</Header>
							<a href='https://www.dugoutcaptain.com/mpk/'><Image src='https://6qvyy3cpq4246fui0a6vndzh-wpengine.netdna-ssl.com/wp-content/themes/dugout-captain/assets/img/pngs/DC-logo.png' size='medium'/></a>
							<p>The Official Workout and Practice Planning Tool of PONY Baseball and Softball</p>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Container>
		</Segment>
	)	
}
