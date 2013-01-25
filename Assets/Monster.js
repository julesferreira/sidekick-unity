#pragma strict

var speed: int;
var damage: int;
var aggro_range: int;
var max_fidget_delay: int;
var fidget_room: int;
private var fidget: boolean;
private var destination: Vector3;
private var origin: Vector3;
private var velocity = Vector3.zero;

function Start () {
	destination = origin = transform.position;
	var fidget_delay = Random.Range(1.0, max_fidget_delay);
	InvokeRepeating("Fidget", 0, fidget_delay);
}
 
function Update ()
{
	if (GameObject.Find("hero") != null)
	{
		var hero_position = GameObject.Find("hero").transform.position;
		var distance_to_hero = Vector3.Distance(hero_position, transform.position);
		if (distance_to_hero < aggro_range)
		{
			fidget = false;
			SetDestination();
		}
		else
		{
			fidget = true;
		}
	}
	
	transform.position = Vector3.SmoothDamp (transform.position, destination, velocity, 0.2, speed);
}

private function SetDestination()
{
	destination = GameObject.Find("hero").transform.position;
}

function OnTriggerEnter (collider : Collider)
{
	if (collider.name == "hero")
	{
		GameObject.Find("hero").GetComponent(Hero).Hit(damage);
		Destroy (this.gameObject);
	}
}

private function Fidget()
{
	if (fidget == true)
	{
		destination = origin;
		destination.x += Random.Range(-fidget_room, fidget_room);
		destination.y += Random.Range(-fidget_room, fidget_room);
		destination = Vector3(destination.x, destination.y, 1);
	}
}