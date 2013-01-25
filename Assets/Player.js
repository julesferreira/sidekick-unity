#pragma strict

var speed: int;
var destination: Vector3;
var heal_range: int;
var heal_cost: int;
var heal_strength: int;
var mana: int;
private var trying_to_cast: boolean;
private var velocity = Vector3.zero;

function Start () {
	InvokeRepeating("ManaRegen", 0, 1.0);
	trying_to_cast = false;
	destination = transform.position;
}
 
function Update ()
{
	// movement
	if (Input.GetMouseButton(1))
	{
		trying_to_cast = false;
		SetDestination();
	}
	
	// heal
	if (Input.GetMouseButtonDown(0))
	{
		var hero_hover = GameObject.Find("hero").GetComponent(Hero).hover;
		if (hero_hover == true)
		{
			trying_to_cast = true;
			MoveToCast();
		}
	}
	
	// keep trying to heal
	if (trying_to_cast)
	{
		MoveToCast();
	}
	
	transform.position = Vector3.SmoothDamp (transform.position, destination, velocity, 0.2, speed);
}

private function SetDestination()
{
	destination = Camera.main.ScreenToWorldPoint(Input.mousePosition);
	destination = Vector3(destination.x, destination.y, 1);
}

private function MoveToCast()
{
	var hero_position = GameObject.Find("hero").transform.position;
	var distance_to_hero = Vector3.Distance(hero_position, transform.position);
	if (distance_to_hero > heal_range)
	{
		destination = hero_position;
	}
	else
	{
		if (mana >= heal_cost)
		{
			mana -= heal_cost;
			GameObject.Find("hero").GetComponent(Hero).Heal(heal_strength);
		}
		destination = transform.position;
		trying_to_cast = false;
	}
}

private function ManaRegen()
{
	if (mana < 100)
	{
		mana += 1;
	}
}