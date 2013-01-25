#pragma strict

var speed: int;
var max_offset: int;
var aggro_range: int;
var hover: boolean;
var health = 100;
private var destination: Vector3;
private var velocity = Vector3.zero;

function Start () {
	destination = transform.position;
	hover = false;
	InvokeRepeating("SetDestination", 0, 2.0);
	InvokeRepeating("HighAlert", 0, 0.5);
}
 
function Update ()
{
	// loss
	if (health <=0)
	{
		Destroy (this.gameObject);
	}

	var mouse_position = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	var distance_to_mouse = Vector3.Distance(mouse_position, transform.position);
	if (distance_to_mouse < transform.lossyScale.x/2)
	{
		hover = true;
	}
	else
	{
		hover = false;
	}
	
	transform.position = Vector3.SmoothDamp (transform.position, destination, velocity, 0.2, speed);
}

private function HighAlert()
{
	// target aquired
	var target_aquired = false;
	var monsters = GameObject.FindGameObjectsWithTag("monster");
	if (monsters != null)
	{
		for (var monster in monsters)
		{
			var distance_to_monster = Vector3.Distance(monster.transform.position, transform.position);
			if (distance_to_monster < aggro_range)
			{
				target_aquired = true;
				destination = monster.transform.position;
				break;
			}
		}
	}
	
	// player moving
	if (!target_aquired)
	{
		var player_position = GameObject.Find("player").transform.position;
		var player_destination = GameObject.Find("player").GetComponent(Player).destination;
		if (player_position != player_destination)
		{
			SetDestination();
		}
	}
}

private function SetDestination()
{
		destination = GameObject.Find("player").transform.position;
		destination.x += Random.Range(-max_offset, max_offset);
		destination.y += Random.Range(-max_offset, max_offset);
		destination = Vector3(destination.x, destination.y, 1);
}

function Heal(points: int)
{
	Debug.Log("heal: " + points);
	health += points;
	if (health > 100)
	{
		health = 100;
	}
}

function Hit(damage: int)
{
	health -= damage;
}